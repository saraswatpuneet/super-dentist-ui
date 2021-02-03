import { specialistReasonKeys } from '../services/clinic';

export function mapFromVerified(verifiedDetails: any, generalDetails: any): any {
  return {
    type: verifiedDetails.type,
    specialties: verifiedDetails.specialty,
    geoLocation: verifiedDetails.Location,
    phoneNumber: verifiedDetails.phoneNumber,
    name: verifiedDetails.name,
    email: verifiedDetails.emailAddress,
    placeId: verifiedDetails.PlaceID,
    address: verifiedDetails.address,
    rating: generalDetails.rating,
    ratingCount: generalDetails.user_ratings_total,
    verified: true,
  };
}

export function mapFromGeneralDetails(generalDetails: any): any {
  let specialty = '';
  const geo = generalDetails.geometry.location;

  if (generalDetails.types && generalDetails.types[0] && specialistReasonKeys[generalDetails.types[0]]) {
    specialty = generalDetails.types[0];
  }

  return {
    type: generalDetails.types ? generalDetails.types[0] : '',
    specialties: [specialty],
    geoLocation: { lat: geo.lat, long: geo.lng },
    phoneNumber: generalDetails.formatted_phone_number,
    name: generalDetails.name,
    email: undefined,
    placeId: generalDetails.place_id,
    address: generalDetails.formatted_address,
    rating: generalDetails.rating,
    ratingCount: generalDetails.user_ratings_total,
    verified: false
  };
}