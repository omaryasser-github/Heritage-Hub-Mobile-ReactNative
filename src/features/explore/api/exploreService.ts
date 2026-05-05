export interface Monument {
  id: string;
  title: string;
  location: string;
  image_url: string;
  rating: number;
  isFavorite: boolean;
}

export const exploreService = {
  getFeed: (): Monument[] => {
    // Mock response simulating network request
    return [
      { id: '1', title: 'The Great Pyramid of Giza', location: 'Giza, Egypt', image_url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6', rating: 4.8, isFavorite: false },
      { id: '2', title: 'Petra', location: 'Ma\'an, Jordan', image_url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0', rating: 4.9, isFavorite: true },
      { id: '3', title: 'Colosseum', location: 'Rome, Italy', image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', rating: 4.7, isFavorite: false },
      { id: '4', title: 'The Great Pyramid of Giza', location: 'Giza, Egypt', image_url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6', rating: 4.8, isFavorite: true },
      { id: '5', title: 'Petra', location: 'Ma\'an, Jordan', image_url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0', rating: 4.9, isFavorite: true },
      { id: '6', title: 'Colosseum', location: 'Rome, Italy', image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', rating: 4.7, isFavorite: false },
      { id: '7', title: 'The Great Pyramid of Giza', location: 'Giza, Egypt', image_url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6', rating: 4.8, isFavorite: false },
      { id: '8', title: 'Petra', location: 'Ma\'an, Jordan', image_url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0', rating: 4.9, isFavorite: true },
      { id: '9', title: 'Colosseum', location: 'Rome, Italy', image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', rating: 4.7, isFavorite: false },
      { id: '10', title: 'The Great Pyramid of Giza', location: 'Giza, Egypt', image_url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6', rating: 4.8, isFavorite: false },
      { id: '11', title: 'Petra', location: 'Ma\'an, Jordan', image_url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0', rating: 4.9, isFavorite: true },
      { id: '12', title: 'Colosseum', location: 'Rome, Italy', image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', rating: 4.7, isFavorite: false },
      { id: '13', title: 'The Great Pyramid of Giza', location: 'Giza, Egypt', image_url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6', rating: 4.8, isFavorite: false },
      { id: '14', title: 'Petra', location: 'Ma\'an, Jordan', image_url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0', rating: 4.9, isFavorite: true },
      { id: '15', title: 'Colosseum', location: 'Rome, Italy', image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', rating: 4.7, isFavorite: false },
      { id: '16', title: 'The Great Pyramid of Giza', location: 'Giza, Egypt', image_url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6', rating: 4.8, isFavorite: false },
      { id: '17', title: 'Petra', location: 'Ma\'an, Jordan', image_url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0', rating: 4.9, isFavorite: true },
      { id: '18', title: 'Colosseum', location: 'Rome, Italy', image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', rating: 4.7, isFavorite: false },
      { id: '19', title: 'The Great Pyramid of Giza', location: 'Giza, Egypt', image_url: 'https://images.unsplash.com/photo-1539667468225-eebb663053e6', rating: 4.8, isFavorite: false },
      { id: '20', title: 'Petra', location: 'Ma\'an, Jordan', image_url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0', rating: 4.9, isFavorite: true },
      { id: '21', title: 'Colosseum', location: 'Rome, Italy', image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', rating: 4.7, isFavorite: false }
    ];
  },
  searchMonuments: async (query: string): Promise<Monument[]> => {
    return [];
  },
  toggleFavorite: async (id: string): Promise<boolean> => {
    return true;
  }
};
