<?php

namespace App\Http\Controller;

use App\Domain\Quote\Repository\QuoteRepository;
use App\Http\Form\QuoteFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class QuoteController extends AbstractController
{
    #[Route( '/', name: 'quote' )]
    public function index( QuoteRepository $quoteRepository ) : Response
    {
        $quotes = $quoteRepository->findAll();

        return $this->render( 'quote/index.html.twig', [
            'quotes' => $quotes,
        ] );
    }

    #[Route( '/citation/create', name: 'quote.create' )]
    public function create( QuoteRepository $quoteRepository, Request $request, EntityManagerInterface $em ) : Response
    {
        $form = $this->createForm( QuoteFormType::class );
        $form->handleRequest( $request );

        if ( $form->isSubmitted() && $form->isValid() ) {
            $quote = $form->getData();

            $em->persist( $quote );
            $em->flush();

            return $this->redirectToRoute( 'app.quote' );
        }

        return $this->render( 'quote/create.html.twig', [
            'formQuote' => $form->createView(),
        ] );
    }

    #[Route( '/citation/{id}/edit', name: 'quote.edit' )]
    public function edit( QuoteRepository $quoteRepository, Request $request, EntityManagerInterface $em, int $id ) : Response
    {
        $quote = $quoteRepository->find( $id );

        $form = $this->createForm( QuoteFormType::class, $quote );
        $form->handleRequest( $request );

        if ( $form->isSubmitted() && $form->isValid() ) {
            $em->flush();

            return $this->redirectToRoute( 'app.quote' );
        }

        return $this->render( 'quote/edit.html.twig', [
            'formQuote' => $form->createView(),
        ] );
    }

    #[Route( '/citation/{id}/delete', name: 'quote.delete' )]
    public function delete( QuoteRepository $quoteRepository, EntityManagerInterface $em, int $id ) : Response
    {
        $quote = $quoteRepository->find( $id );

        $em->remove( $quote );
        $em->flush();

        return $this->redirectToRoute( 'app.quote' );
    }
}
