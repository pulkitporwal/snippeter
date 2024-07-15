export interface SideBarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icons: string;
  url: string;
}

export interface SingleSnippetType {
  _id: string;
  title: string;
  tags: string[];
  description: string;
  code: string;
  language: string;
  isFavorite: boolean;
  isTrashed: boolean;
  snippet?: [];
}

export interface SavingData {
  title: string,
  description: string
}