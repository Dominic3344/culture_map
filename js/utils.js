/* Listing storage, filtering, submission & moderation helpers */
(function () {
const STORAGE_KEY = "living_culture_map_listings_v1";

function getInitialListings() {
    if (typeof window === "undefined") {
        return window.INITIAL_CULTURAL_LISTINGS;
    }

    try {
        const seedListings = window.INITIAL_CULTURAL_LISTINGS || [];
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(seedListings));
            return seedListings;
        }

        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed) && parsed.length > 0) {
            // Update existing seeded listings with the latest seed data.
            const updatedListings = parsed.map(function (savedItem) {
                const seedItem = seedListings.find(function (item) {
                    return item.id === savedItem.id;
                });

                if (seedItem) {
                    return Object.assign({}, savedItem, {
                        imageUrl: seedItem.imageUrl
                    });
                }

                // Preserve user-submitted listings.
                return savedItem;
            });

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedListings)
            );

            return updatedListings;
        }

        return seedListings;

    } catch (err) {
        console.warn("Failed to read from localStorage:", err);
        return window.INITIAL_CULTURAL_LISTINGS;
    }
}

function saveListingsToStorage(listings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch (err) {
    console.warn("Failed to save to localStorage:", err);
  }
}
function filterListings(listings, filters) {
  return listings.filter((item) => {
    if (filters.status && filters.status !== "all") {
      if (item.verificationStatus !== filters.status) {
        return false;
      }
    }
    if (filters.state && filters.state.trim() !== "") {
      if (item.state.toLowerCase() !== filters.state.toLowerCase()) {
        return false;
      }
    }
    if (filters.district && filters.district !== "all" && filters.district.trim() !== "") {
      if (item.district.toLowerCase() !== filters.district.toLowerCase()) {
        return false;
      }
    }
    if (filters.artForm && filters.artForm !== "all" && filters.artForm.trim() !== "") {
      if (item.artForm.toLowerCase() !== filters.artForm.toLowerCase()) {
        return false;
      }
    }
    if (filters.experienceType && filters.experienceType !== "all" && filters.experienceType.trim() !== "") {
      if (item.experienceType.toLowerCase() !== filters.experienceType.toLowerCase()) {
        return false;
      }
    }
    if (filters.seasonality && filters.seasonality !== "all" && filters.seasonality.trim() !== "") {
      if (item.seasonalityType.toLowerCase() !== filters.seasonality.toLowerCase()) {
        return false;
      }
    }
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchStory = item.backgroundStory.toLowerCase().includes(q);
      const matchSignificance = item.communitySignificance.toLowerCase().includes(q);
      const matchLocality = item.locality.toLowerCase().includes(q);
      const matchArtist = item.artistOrOrganiser.toLowerCase().includes(q);
      const matchTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchStory && !matchSignificance && !matchLocality && !matchArtist && !matchTags) {
        return false;
      }
    }
    return true;
  });
}
function createCommunitySubmission(input, existingListings) {
  if (!input.title || input.title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters long");
  }
  if (!input.district || input.district.trim().length === 0) {
    throw new Error("District is required");
  }
  if (!input.description || input.description.trim().length < 10) {
    throw new Error("Description must be at least 10 characters long");
  }
  if (!input.contributorName || input.contributorName.trim().length === 0) {
    throw new Error("Contributor name is required");
  }
  const id = `comm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const defaultImage = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80";
  const newListing = {
    id,
    title: input.title.trim(),
    artForm: input.artForm,
    state: input.state || "Kerala",
    district: input.district.trim(),
    locality: input.locality.trim() || input.district.trim(),
    experienceType: input.experienceType,
    dateOrSeason: input.dateOrSeason.trim() || "Check local announcements",
    seasonalityType: input.seasonalityType || "Seasonal",
    description: input.description.trim(),
    backgroundStory: input.backgroundStory.trim() || "Community contributed cultural tradition spotlight. Details pending editorial expansion.",
    communitySignificance: input.communitySignificance.trim() || "Sustained by local community members, practitioners, and regional cultural enthusiasts.",
    artistOrOrganiser: input.artistOrOrganiser.trim() || "Local Community Guild",
    guruOrLineage: input.guruOrLineage?.trim(),
    sourceUrl: input.sourceUrl?.trim(),
    socialMediaUrl: input.socialMediaUrl?.trim(),
    imageUrl: input.imageUrl?.trim() || defaultImage,
    verificationStatus: "pending",
    contributorName: input.contributorName.trim(),
    contributorContact: input.contributorContact?.trim(),
    visitingEtiquette: input.visitingEtiquette?.trim() || "Respect local customs and sacred traditions.",
    tags: input.tags && input.tags.length > 0 ? input.tags : [input.district, input.artForm],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const updatedListings = [newListing, ...existingListings];
  saveListingsToStorage(updatedListings);
  return { listing: newListing, updatedListings };
}
function moderateListing(id, newStatus, moderatorNotes, verifiedBy, existingListings) {
  const updated = existingListings.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        verificationStatus: newStatus,
        moderatorNotes: moderatorNotes.trim() || void 0,
        verifiedBy: newStatus === "verified" ? verifiedBy.trim() || "District Cultural Council" : void 0,
        verificationDate: newStatus === "verified" ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : void 0
      };
    }
    return item;
  });
  saveListingsToStorage(updated);
  return updated;
}
  window.getInitialListings = getInitialListings; window.filterListings = filterListings; window.createCommunitySubmission = createCommunitySubmission; window.moderateListing = moderateListing;
})();
