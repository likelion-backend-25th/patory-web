export interface PostListItem {
  id: number;
  type: number;
  content: string;
  bgmUrl: string | null;
  isSubscriberOnly: boolean;
  hashtags: string;
  createdAt: string;
  updatedAt: string;
  memberId: number;
  nickname: string;
  profileImage: string | null;
  imageUrls: string[];
  likeCount: number;
  commentCount: number;
}

export interface PostListSlice {
  content: PostListItem[];
  hasNext: boolean;
  lastPostId: number | null;
}
