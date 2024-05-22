<?php

namespace App\Domain\Quote\Entity;

use App\Domain\Quote\Repository\QuoteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: QuoteRepository::class)]
class Quote
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['quote:read', 'quote:write'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['quote:read', 'quote:write'])]
    private ?string $content = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['quote:read', 'quote:write'])]
    private ?string $author = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['quote:read', 'quote:write'])]
    private ?bool $isVerified = null;

    #[ORM\Column]
    #[Groups(['quote:read'])]
    private ?int $likes = null;

    #[ORM\Column]
    #[Groups(['quote:read'])]
    private ?int $dislikes = null;

    /**
     * @var Collection<int, LikeDislike>
     */
    #[ORM\OneToMany(targetEntity: LikeDislike::class, mappedBy: 'quote', orphanRemoval: true)]
    private Collection $likeDislikes;

    public function __construct()
    {
        $this->likes = 0;
        $this->dislikes = 0;
        $this->likeDislikes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(?string $author): static
    {
        $this->author = $author;

        return $this;
    }

    public function getIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(?bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getLikes(): ?int
    {
        return $this->likes;
    }

    public function setLikes(int $likes): static
    {
        $this->likes = max( $likes, 0 );

        return $this;
    }

    public function getDislikes(): ?int
    {
        return $this->dislikes;
    }

    public function setDislikes(int $dislikes): static
    {
        $this->dislikes = max( $dislikes, 0);

        return $this;
    }

    /**
     * @return Collection<int, LikeDislike>
     */
    public function getLikeDislikes(): Collection
    {
        return $this->likeDislikes;
    }

    public function addLikeDislike(LikeDislike $likeDislike): static
    {
        if (!$this->likeDislikes->contains($likeDislike)) {
            $this->likeDislikes->add($likeDislike);
            $likeDislike->setQuote($this);
        }

        return $this;
    }

    public function removeLikeDislike(LikeDislike $likeDislike): static
    {
        if ($this->likeDislikes->removeElement($likeDislike)) {
            // set the owning side to null (unless already changed)
            if ($likeDislike->getQuote() === $this) {
                $likeDislike->setQuote(null);
            }
        }

        return $this;
    }
}
