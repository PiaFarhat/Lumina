export interface JsonPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface JsonPlaceholderComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface JsonPlaceholderTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface JsonPlaceholderAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface JsonPlaceholderPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface JsonPlaceholderPostResponse {
  id: number;
  userId?: number;
  title: string;
  body: string;
}

export interface JsonPlaceholderCommentResponse {
  id: number;
  postId?: number;
  name?: string;
  email?: string;
  body: string;
}
