<?php

namespace App\Http\Controller;

use App\Domain\Quote\Entity\LikeDislike;
use App\Domain\Quote\Entity\Quote;
use App\Domain\Quote\Enum\VoteType;
use App\Domain\Quote\Repository\LikeDislikeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LikeDislikeController extends AbstractController
{
    #[Route('/quote/{id}/like', name: 'like', methods: ['POST'])]
    public function like(Quote $quote, Request $request, EntityManagerInterface $em, LikeDislikeRepository $likeDislikeRepo): JsonResponse
    {
        $ipAddress = $request->getClientIp();
        $existingVote = $likeDislikeRepo->findOneBy(['quote' => $quote, 'ipAddress' => $ipAddress]);

        if ($existingVote) {
            if ($existingVote->getVoteType() === VoteType::LIKE) {
                // Remove like
                $em->remove($existingVote);
                $quote->setLikes($quote->getLikes() - 1);
            } else {
                // Change dislike to like
                $existingVote->setVoteType(VoteType::LIKE);
                $quote->setLikes($quote->getLikes() + 1);
                $quote->setDislikes($quote->getDislikes() - 1);
            }
        } else {
            // Add new like
            $likeDislike = new LikeDislike();
            $likeDislike->setIpAddress($ipAddress);
            $likeDislike->setQuote($quote);
            $likeDislike->setVoteType(VoteType::LIKE);
            $em->persist($likeDislike);

            $quote->setLikes($quote->getLikes() + 1);
        }

        $em->flush();

        return new JsonResponse(['likes' => $quote->getLikes(), 'dislikes' => $quote->getDislikes()]);
    }

    #[Route('/quote/{id}/dislike', name: 'dislike', methods: ['POST'])]
    public function dislike(Quote $quote, Request $request, EntityManagerInterface $em, LikeDislikeRepository $likeDislikeRepo): JsonResponse
    {
        $ipAddress = $request->getClientIp();
        $existingVote = $likeDislikeRepo->findOneBy(['quote' => $quote, 'ipAddress' => $ipAddress]);

        if ($existingVote) {
            if ($existingVote->getVoteType() === VoteType::DISLIKE) {
                // Remove dislike
                $em->remove($existingVote);
                $quote->setDislikes($quote->getDislikes() - 1);
            } else {
                // Change like to dislike
                $existingVote->setVoteType(VoteType::DISLIKE);
                $quote->setDislikes($quote->getDislikes() + 1);
                $quote->setLikes($quote->getLikes() - 1);
            }
        } else {
            // Add new dislike
            $likeDislike = new LikeDislike();
            $likeDislike->setIpAddress($ipAddress);
            $likeDislike->setQuote($quote);
            $likeDislike->setVoteType(VoteType::DISLIKE);
            $em->persist($likeDislike);

            $quote->setDislikes($quote->getDislikes() + 1);
        }

        $em->flush();

        return new JsonResponse(['likes' => $quote->getLikes(), 'dislikes' => $quote->getDislikes()]);
    }

}