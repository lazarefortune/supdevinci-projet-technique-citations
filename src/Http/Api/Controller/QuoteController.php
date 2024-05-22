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

#[Route( '/api/quotes' )]
class QuoteController extends AbstractController
{
//    #[Route('/', name: 'quotes')]
//    public function index(QuoteRepository $quoteRepository): Response
//    {
//        $quotes = $quoteRepository->findAll();
//
//        return $this->json([
//            'quotes' => $quotes
//        ]);
//    }

    #[Route( '/', name: 'api_quotes', methods: ['GET'] )]
    public function getQuotes( Request $request, QuoteRepository $quoteRepository ) : JsonResponse
    {
        $quotes = $quoteRepository->findBy( [], ['likes' => 'DESC', 'dislikes' => 'ASC'] );
        return $this->json( ['quotes' => $quotes], 200, [], ['groups' => 'quote:read'] );
    }

    #[Route( '/', name: 'api_create_quote', methods: ['POST'] )]
    public function createQuote( Request $request, EntityManagerInterface $em ) : JsonResponse
    {
        $data = json_decode( $request->getContent(), true );

        // check required fields
        if ( !isset( $data['content'] ) || !isset( $data['author'] ) ) {
            return $this->json( ['error' => 'Missing required fields (content, author)'], 400 );
        }

        $quote = new Quote();
        $quote->setContent( $data['content'] );
        $quote->setAuthor( $data['author'] );
        if ( isset( $data['isVerified'] ) ) {
            $quote->setIsVerified( $data['isVerified'] );
        }
        $em->persist( $quote );
        $em->flush();
        return $this->json( $quote, 201, [], ['groups' => 'quote:read'] );
    }

    #[Route( '/{id}', name: 'api_update_quote', methods: ['PUT'] )]
    public function updateQuote( $id, Request $request, EntityManagerInterface $em, QuoteRepository $quoteRepository ) : JsonResponse
    {
        $quote = $quoteRepository->find( $id );
        if ( !$quote ) {
            return $this->json( ['error' => 'Quote not found'], 404 );
        }

        $data = json_decode( $request->getContent(), true );

        // update only if the field is set
        if ( isset( $data['content'] ) ) {
            $quote->setContent( $data['content'] );
        }
        if ( isset( $data['author'] ) ) {
            $quote->setAuthor( $data['author'] );
        }
        if ( isset( $data['isVerified'] ) ) {
            $quote->setIsVerified( $data['isVerified'] );
        }
        $em->flush();

        return $this->json( $quote, 200, [], ['groups' => 'quote:read'] );
    }

    #[Route( '/{id}', name: 'api_delete_quote', methods: ['DELETE'] )]
    public function deleteQuote( $id, EntityManagerInterface $em, QuoteRepository $quoteRepository ) : JsonResponse
    {
        $quote = $quoteRepository->find( $id );
        if ( !$quote ) {
            return $this->json( ['error' => 'Quote not found'], 404 );
        }

        $em->remove( $quote );
        $em->flush();

        return $this->json( ['message' => 'Quote deleted'] );
    }

    #[Route( '/{id}/like', name: 'like', methods: ['POST'] )]
    public function like( Quote $quote, Request $request, EntityManagerInterface $em, LikeDislikeRepository $likeDislikeRepo ) : JsonResponse
    {
        $ipAddress = $request->getClientIp();
        $existingVote = $likeDislikeRepo->findOneBy( ['quote' => $quote, 'ipAddress' => $ipAddress] );

        if ( $existingVote ) {
            if ( $existingVote->getVoteType() === VoteType::LIKE ) {
                // Remove like
                $em->remove( $existingVote );
                $quote->setLikes( $quote->getLikes() - 1 );
            } else {
                // Change dislike to like
                $existingVote->setVoteType( VoteType::LIKE );
                $quote->setLikes( $quote->getLikes() + 1 );
                $quote->setDislikes( $quote->getDislikes() - 1 );
            }
        } else {
            // Add new like
            $likeDislike = new LikeDislike();
            $likeDislike->setIpAddress( $ipAddress );
            $likeDislike->setQuote( $quote );
            $likeDislike->setVoteType( VoteType::LIKE );
            $em->persist( $likeDislike );

            $quote->setLikes( $quote->getLikes() + 1 );
        }

        $em->flush();

        return $this->json( ['likes' => $quote->getLikes(), 'dislikes' => $quote->getDislikes()], 200, [], ['groups' => 'quote:read'] );
    }

    #[Route( '/{id}/dislike', name: 'dislike', methods: ['POST'] )]
    public function dislike( Quote $quote, Request $request, EntityManagerInterface $em, LikeDislikeRepository $likeDislikeRepo ) : JsonResponse
    {
        $ipAddress = $request->getClientIp();
        $existingVote = $likeDislikeRepo->findOneBy( ['quote' => $quote, 'ipAddress' => $ipAddress] );

        if ( $existingVote ) {
            if ( $existingVote->getVoteType() === VoteType::DISLIKE ) {
                // Remove dislike
                $em->remove( $existingVote );
                $quote->setDislikes( $quote->getDislikes() - 1 );
            } else {
                // Change like to dislike
                $existingVote->setVoteType( VoteType::DISLIKE );
                $quote->setDislikes( $quote->getDislikes() + 1 );
                $quote->setLikes( $quote->getLikes() - 1 );
            }
        } else {
            // Add new dislike
            $likeDislike = new LikeDislike();
            $likeDislike->setIpAddress( $ipAddress );
            $likeDislike->setQuote( $quote );
            $likeDislike->setVoteType( VoteType::DISLIKE );
            $em->persist( $likeDislike );

            $quote->setDislikes( $quote->getDislikes() + 1 );
        }

        $em->flush();

//        return new JsonResponse(['likes' => $quote->getLikes(), 'dislikes' => $quote->getDislikes()]);
        return $this->json( ['likes' => $quote->getLikes(), 'dislikes' => $quote->getDislikes()], 200, [], ['groups' => 'quote:read'] );
    }

}