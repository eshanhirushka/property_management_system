import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    headscount: number,
    dayscount: number,
    roomscount: number,
    contactno: number,
    name: string,
    address: string,
    price: number,
    title: string,
}

export interface BookingCardProps {
  id?: BaseKey | undefined,
  name: string,
  headscount: number,
  dayscount: number,
  roomscount: number,
}