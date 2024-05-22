<?php

namespace App\Http\Api\Controller;

use App\Domain\Quote\Entity\LikeDislike;
use App\Domain\Quote\Entity\Quote;
use App\Domain\Quote\Enum\VoteType;
use App\Domain\Quote\Repository\LikeDislikeRepository;
use App\Domain\Quote\Repository\QuoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/quotes')]
class QuoteController extends AbstractController
{

    public function __construct(private readonly EntityManagerInterface $em)
    {
    }

    #[Route('/', name: 'api_quotes', methods: ['GET'])]
    public function getQuotes(QuoteRepository $quoteRepository): JsonResponse
    {
        $quotes = $quoteRepository->findBy([], ['likes' => 'DESC', 'dislikes' => 'ASC']);
        return $this->json(['quotes' => $quotes], Response::HTTP_OK, [], ['groups' => 'quote:read']);
    }

    #[Route('/', name: 'api_create_quote', methods: ['POST'])]
    public function createQuote(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$this->validateRequiredFields($data, ['content', 'author'])) {
            return $this->json(['error' => 'Missing required fields (content, author)'], Response::HTTP_BAD_REQUEST);
        }

        $quote = (new Quote())
            ->setContent($data['content'])
            ->setAuthor($data['author'])
            ->setIsVerified($data['isVerified'] ?? false);

        $this->em->persist($quote);
        $this->em->flush();

        return $this->json($quote, Response::HTTP_CREATED, [], ['groups' => 'quote:read']);
    }

    #[Route('/{id}', name: 'api_update_quote', methods: ['PUT'])]
    public function updateQuote(int $id, Request $request, QuoteRepository $quoteRepository): JsonResponse
    {
        $quote = $quoteRepository->find($id);

        if (!$quote) {
            return $this->json(['error' => 'Quote not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $quote
            ->setContent($data['content'] ?? $quote->getContent())
            ->setAuthor($data['author'] ?? $quote->getAuthor())
            ->setIsVerified($data['isVerified'] ?? $quote->getIsVerified());

        $this->em->flush();

        return $this->json($quote, Response::HTTP_OK, [], ['groups' => 'quote:read']);
    }

    #[Route('/{id}', name: 'api_delete_quote', methods: ['DELETE'])]
    public function deleteQuote(int $id, QuoteRepository $quoteRepository): JsonResponse
    {
        $quote = $quoteRepository->find($id);

        if (!$quote) {
            return $this->json(['error' => 'Quote not found'], Response::HTTP_NOT_FOUND);
        }

        $this->em->remove($quote);
        $this->em->flush();

        return $this->json(['message' => 'Quote deleted'], Response::HTTP_OK);
    }

    #[Route('/{id}/like', name: 'like', methods: ['POST'])]
    public function like(Quote $quote, Request $request, LikeDislikeRepository $likeDislikeRepo): JsonResponse
    {
        return $this->handleVote($quote, $request, $likeDislikeRepo, VoteType::LIKE);
    }

    #[Route('/{id}/dislike', name: 'dislike', methods: ['POST'])]
    public function dislike(Quote $quote, Request $request, LikeDislikeRepository $likeDislikeRepo): JsonResponse
    {
        return $this->handleVote($quote, $request, $likeDislikeRepo, VoteType::DISLIKE);
    }

    private function validateRequiredFields(array $data, array $requiredFields): bool
    {
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return false;
            }
        }
        return true;
    }

    private function handleVote(Quote $quote, Request $request, LikeDislikeRepository $likeDislikeRepo, VoteType $voteType): JsonResponse
    {
        $ipAddress = $request->getClientIp();
        $existingVote = $likeDislikeRepo->findOneBy(['quote' => $quote, 'ipAddress' => $ipAddress]);

        ($existingVote) ? $this->updateExistingVote($existingVote, $quote, $voteType) : $this->addNewVote($ipAddress, $quote, $voteType);

        $this->em->flush();

        return $this->json(['likes' => $quote->getLikes(), 'dislikes' => $quote->getDislikes()], Response::HTTP_OK, [], ['groups' => 'quote:read']);
    }

    private function updateExistingVote(LikeDislike $existingVote, Quote $quote, VoteType $voteType): void
    {
        if ($existingVote->getVoteType() === $voteType) {
            $this->em->remove($existingVote);
            $quote->setLikes($quote->getLikes() - ($voteType === VoteType::LIKE ? 1 : 0));
            $quote->setDislikes($quote->getDislikes() - ($voteType === VoteType::DISLIKE ? 1 : 0));
        } else {
            $existingVote->setVoteType($voteType);
            $quote->setLikes($quote->getLikes() + ($voteType === VoteType::LIKE ? 1 : -1));
            $quote->setDislikes($quote->getDislikes() + ($voteType === VoteType::DISLIKE ? 1 : -1));
        }
    }

    private function addNewVote(string $ipAddress, Quote $quote, VoteType $voteType): void
    {
        $likeDislike = new LikeDislike();
        $likeDislike->setIpAddress($ipAddress);
        $likeDislike->setQuote($quote);
        $likeDislike->setVoteType($voteType);

        $this->em->persist($likeDislike);
        $quote->setLikes($quote->getLikes() + ($voteType === VoteType::LIKE ? 1 : 0));
        $quote->setDislikes($quote->getDislikes() + ($voteType === VoteType::DISLIKE ? 1 : 0));
    }
}
