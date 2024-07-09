export interface Name {
  title: string
  first: string
  last: string
}

export interface Street {
  number: number
  name: string
}

export interface Location {
  street: Street
  city: string
  country: string
  postcode: string
}

export interface Picture {
  large: string
}

export interface UserData {
  name: Name
  email: string
  dob: { age: number }
  location: Location
  phone: string
  picture: Picture
}
