export interface Advertisement {
  /* Уникальный идентификатор. */
  id: string;
  /* Название. */
  name: string;
  /* Описание. */
  description?: string;
  /* Цена. */
  price: number;
  /* Дата и время создания. */
  createdAt: string;
  /* Количество просмотров. */
  views: number;
  /* Количество лайков. */
  likes: number;
  /* Ссылка на изображение. */
  imageUrl?: string;
}

export type AdvertisementNew = Omit<Advertisement, 'id'>;

export type AdvertisementPatch = Omit<Advertisement, 'id' | 'createdAt' | 'views' | 'likes' >;

export type AdvertisementList = Advertisement[];

export const OrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6
} as const;

export type OrderStatusKeyType = keyof typeof OrderStatus;

type OrderItem = Advertisement & { count: number; };

export interface Order {
  /* Уникальный идентификатор. */
  id: string;
  /* Статус. */
  status: typeof OrderStatus[keyof typeof OrderStatus];
  /* Дата и время создания. */
  createdAt: string;
  /* Дата и время завершения. */
  finishedAt?: string;
  /* Товары в заказе. */
  items: OrderItem[];
  /* Способ доставки(Почта, СДЭК...) */
  deliveryWay: string;
  /* Сумма заказа */
  total: number;
}

export type OrdersList = Order[];

// interface Image {
//   /* Уникальный идентификатор. */
//   id: number;
//   /* Ссылка. */
//   url: string;
//   /* Название. */
//   name: string;
// }
