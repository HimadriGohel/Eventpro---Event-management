import * as venueService from './venues.service.js';
 
export const getAllVenues = async (
  req,
  res
) => {
  try {
    const venues =
      await venueService.getAllVenues();

    res.status(200).json({
      success: true,
      data: venues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 