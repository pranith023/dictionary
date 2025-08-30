interface PexelsImage {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

interface PexelsResponse {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  photos: PexelsImage[];
}

export const fetchPexelsImages = async (query: string): Promise<PexelsImage[]> => {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
  if (!apiKey) {
    console.error("Pexels API key is not set. Please check your .env.local file.");
    return [];
  }
  
  const headers = {
    Authorization: apiKey,
  };
  
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=6`, { headers });
    if (!response.ok) {
      throw new Error(`Pexels API request failed with status: ${response.status}`);
    }
    const data: PexelsResponse = await response.json();
    return data.photos;
  } catch (error) {
    console.error("Error fetching Pexels images:", error);
    return [];
  }
};