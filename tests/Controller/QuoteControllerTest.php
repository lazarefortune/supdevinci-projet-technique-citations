<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Domain\Quote\Entity\Quote;
use App\Domain\Quote\Enum\VoteType;
use Symfony\Component\HttpFoundation\Response;

class QuoteControllerTest extends WebTestCase
{
    public function testGetQuotes(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/quotes/');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $responseData = json_decode($client->getResponse()->getContent(), true);

        $this->assertIsArray($responseData);
        $this->assertArrayHasKey('currentPage', $responseData);
        $this->assertArrayHasKey('itemsPerPage', $responseData);
        $this->assertEquals(1, $responseData['currentPage']);
        $this->assertEquals(10, $responseData['itemsPerPage']);
    }

    public function testCreateQuote(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/quotes/', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'content' => 'Test quote',
            'author' => 'Test author',
            'isVerified' => true,
        ]));

        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $responseData = json_decode($client->getResponse()->getContent(), true);

        $this->assertIsArray($responseData);
        $this->assertEquals('Test quote', $responseData['content']);
        $this->assertEquals('Test author', $responseData['author']);
        $this->assertTrue($responseData['isVerified']);
    }

    public function testUpdateQuote(): void
    {
        $client = static::createClient();
        $quote = $this->createQuote('Original content', 'Original author', true);
        $client->request('PUT', '/api/quotes/' . $quote->getId(), [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'content' => 'Updated content',
            'author' => 'Updated author',
            'isVerified' => false,
        ]));

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $responseData = json_decode($client->getResponse()->getContent(), true);

        $this->assertIsArray($responseData);
        $this->assertEquals('Updated content', $responseData['content']);
        $this->assertEquals('Updated author', $responseData['author']);
        $this->assertFalse($responseData['isVerified']);
    }

    public function testDeleteQuote(): void
    {
        $client = static::createClient();
        $quote = $this->createQuote('Test content to delete', 'Test author', true);
        $client->request('DELETE', '/api/quotes/' . $quote->getId());

        $this->assertResponseIsSuccessful();
        $responseData = json_decode($client->getResponse()->getContent(), true);

        $this->assertIsArray($responseData);
        $this->assertEquals('Quote deleted', $responseData['message']);
    }

    public function testLikeQuote(): void
    {
        $client = static::createClient();
        $quote = $this->createQuote('Test content for like', 'Test author', true);
        $client->request('POST', '/api/quotes/' . $quote->getId() . '/like');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $responseData = json_decode($client->getResponse()->getContent(), true);

        $this->assertIsArray($responseData);
        $this->assertEquals(1, $responseData['likes']);
        $this->assertEquals(0, $responseData['dislikes']);
        $this->assertEquals(VoteType::LIKE->value, $responseData['userVote']);
    }

    public function testDislikeQuote(): void
    {
        $client = static::createClient();
        $quote = $this->createQuote('Test content for dislike', 'Test author', true);
        $client->request('POST', '/api/quotes/' . $quote->getId() . '/dislike');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $responseData = json_decode($client->getResponse()->getContent(), true);

        $this->assertIsArray($responseData);
        $this->assertEquals(0, $responseData['likes']);
        $this->assertEquals(1, $responseData['dislikes']);
        $this->assertEquals(VoteType::DISLIKE->value, $responseData['userVote']);
    }

    private function createQuote(string $content, string $author, bool $isVerified): Quote
    {
        $quote = new Quote();
        $quote->setContent($content);
        $quote->setAuthor($author);
        $quote->setIsVerified($isVerified);

        $em = self::getContainer()->get('doctrine')->getManager();
        $em->persist($quote);
        $em->flush();

        return $quote;
    }
}
