import { Request, Response } from 'express';
import { Profile } from '../models/Profiles.model';

// Retrieve a user's profile
const getProfile = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Find the user's profile by email
    const userProfile = await Profile.findOne({ 'personal.email': email });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    // Respond with the user's profile data
    return res.status(200).json({ message: 'Profile retrieved successfully', profile: userProfile });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// update an existing profile
const updateProfile = async (req: Request, res: Response) => {
  const { email, profileData } = req.body;

  try {
    // Check if required fields are provided
    if (!email || !profileData) {
      return res.status(400).json({ message: 'Email and profileData are required.' });
    }

    // Add authentication here to verify the user's identity, e.g., using JWT or sessions

    // Find the user by email
    const foundUserProfile = await Profile.findOne({ 'personal.email': email });

    if (!foundUserProfile) {
      return res.status(404).json({ message: 'Profile was not found.' });
    }

    // Update specific fields in the user's profile based on profileData
    if (profileData.personal) {
      // Update personal information
      Object.assign(foundUserProfile.profileData.personal, profileData.personal);
    }
    if (profileData.nextOfKin) {
      // Update nextOfKin information
      Object.assign(foundUserProfile.profileData.nextOfKin, profileData.nextOfKin);
    }
    if (profileData.bankDetails) {
      // Update bankDetails information
      Object.assign(foundUserProfile.profileData.bankDetails, profileData.bankDetails);
    }
    if (profileData.possition) {
      // Update possition information
      Object.assign(foundUserProfile.profileData.possition, profileData.possition);
    }

    // Save the updated profile
    await foundUserProfile.save();

    // Respond with a success message and the updated user data
    return res.status(200).json({ message: 'Profile updated successfully', user: foundUserProfile });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// create new profile for the current user
const createProfile = async (req: Request, res: Response) => {
  const { email, profileData } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUserProfile = await Profile.findOne({ 'personal.email': email });
    if (existingUserProfile) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    // Create a new profile instance
    const profile = new Profile({
      profileData
    });

    // Save the profile to the database
    await profile.save();

    // Respond with a success message and the created profile data
    return res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default { getProfile, updateProfile, createProfile };
