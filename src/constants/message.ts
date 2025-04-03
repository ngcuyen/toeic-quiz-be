export const MESSAGES = {
  DATABASE: {
    CONNECT_SUCCESS: '🌱 Successfully connected to the database.',
    DISCONNECT_SUCCESS: '⛔️ Successfully disconnected from the database.',
    USERNAME: 'Username credentials to access the database main',
    PASSWORD: 'Password credentials to access the database main ',
    COLLECTIONS: {
      USERS: 'Holds user information.',
      REFRESH_TOKENS: 'Holds refresh-token information.',
      OTP: 'Holds OTP data.',
      QUESTION: 'Holds questions.',
      CATEGORY: 'Holds categories.',
      PARAGRAPH: 'Holds paragraphs.',
      BLANK: 'Holds blanks.',
      EXAM: 'Holds exams.',
      EXAM_QUESTION: 'Holds examQuestions.'
    }
  },
  AUTH: {
    OTP: {
      NAME: 'Gmail account display name for OTP.',
      ACCOUNT: 'Gmail account email for OTP.',
      PASSWORD: 'Gmail account password for OTP.'
    },
    JWT: {
      SECRET_KEY: 'Unique secret string for JWT, stored securely.',
      REFRESH_TOKEN_KEY: 'Unique refresh token secret string, stored securely.',
      EXPIRATION: {
        ACCESS_TOKEN: 'Access token expiration duration.',
        REFRESH_TOKEN: 'Refresh token expiration duration.'
      },
      ALGORITHM: 'List of allowed JWT algorithms.',
      OTP_SECRET: 'Security string for OTP.'
    },
    OAUTH2: {
      GOOGLE_CLIENT_ID: 'Client ID for Google authentication.',
      GOOGLE_CLIENT_SECRET: 'Client secret for Google authentication.',
      GOOGLE_CALLBACK: 'Callback URL for Google authentication.',
      FACEBOOK_APP_ID: 'Client ID for Facebook authentication.',
      FACEBOOK_APP_SECRET: 'Client secret for Facebook authentication.',
      FACEBOOK_CALLBACK: 'Callback URL for Facebook authentication.',
      GITHUB_CLIENT_ID: 'Client ID for Github authentication.',
      GITHUB_CLIENT_SECRET: 'Client secret for Github authentication.',
      GITHUB_CALLBACK: 'Callback URL for Github authentication.'
    }
  },
  ENVIRONMENT: {
    PORT: 'Server port.',
    HOST: 'Server host.',
    DEV: 'Environment is a collection of procedures and tools for developing, testing and debugging an application or program.',
    PROD: 'Environment contains just the final version of the product in order to avoid any confusion or security vulnerabilities',
    TEST: 'Testing environment setup.'
  },
  CLIENT: {
    REQUEST: {
      POINT: 'Maximum points consumable over duration.',
      DURATION: 'Seconds before points reset.',
      PASSWORD_SECRET: 'Security string for passwords.',
      OTP_SECRET: 'Security string for OTP.',
      COOKIE_EXPIRATION: 'Cookie expiration duration.',
      SECRET_COOKIE_NAME: 'Cookie name for successful login/register.',
      PATHS: {
        PROVINCE_JSON: 'Path to province.json file.',
        OPENAPI_YAML: 'Path to paths.yaml file.'
      },
      SERVER_URL: 'Backend URL.'
    }
  },
  ERROR_MESSAGES: {
    GENERAL: {
      LOGIN: 'Login process failed',
      REGISTER: 'Registration process failed',
      FIND_OTP: 'Failed to find OTP',
      GENERATED_OTP: 'OTP generation failed',
      VERIFY_OTP: 'OTP verification failed',
      VERIFY_FORGOT_PASSWORD_TOKEN: 'Forgot-password token verification failed',
      GET_ALL_USER: 'Failed to retrieve users',
      GET_ALL_ROLE: 'Failed to retrieve users role',
      GET_USER_PROFILE: 'Failed to retrieve users profile',
      UPDATE_USER: 'User update failed',
      AVATAR: 'Upload avatar failed',

      LOGOUT: 'Logout process failed',
      CHANGE_PASSWORD: 'Password change failed',
      FORGOT_PASSWORD: 'Forgot-password process failed',
      SEND_FAILURE: 'OTP sending failed',
      GET_ROLE_USER: 'Retrieving users by role failed',
      INSERT_TAGS: 'Tag insertion failed',
      GET_ALL_TAGS: 'Failed to retrieve all tags',
      GET_TAGS_BY_ID: 'Failed to retrieve tags by ID',
      UPDATE_TAGS: 'Tag update failed',
      DELETED_TAGS: 'Tag deletion failed',
      LIKE_PRODUCT: 'Product liking failed',
      UNLIKE_PRODUCT: 'Product unliking failed',
      GET_ALL_PRODUCT_FAVORITE: 'Failed to retrieve all favorite products by user'
    },
    USER_SPECIFIC: {
      NOT_FOUND: 'User not found.',
      PASSWORD_INCORRECT: 'Incorrect password.',
      ACCOUNT_LOCKED: 'Account is locked or banned.'
    },
    QUESTION: {
      GET_ALL: 'Get all questions failed',
      GET_BY_ID: 'Get question by id failed',
      CREATE: 'Create question failed',
      UPDATE: 'Update question failed',
      DELETE: 'Delete question failed',
      NOT_FOUND: 'Not found question document'
    },
    CATEGORY: {
      GET_ALL: 'Get all categories failed',
      GET_BY_ID: 'Get category by id failed',
      CREATE: 'Create category failed',
      UPDATE: 'Update category failed',
      DELETE: 'Delete category failed',
      NOT_FOUND: 'Not found category document'
    },
    BLANK: {
      GET_ALL: 'Get all blanks failed',
      GET_BY_ID: 'Get blank by id failed',
      CREATE: 'Create blank failed',
      UPDATE: 'Update blank failed',
      DELETE: 'Delete blank failed',
      NOT_FOUND: 'Not found blank document'
    },
    EXAM: {
      GET_ALL: 'Get all exams failed',
      GET_BY_ID: 'Get exam by id failed',
      CREATE: 'Create exam failed',
      UPDATE: 'Update exam failed',
      DELETE: 'Delete exam failed',
      NOT_FOUND: 'Not found exam document'
    },
    PARAGRAPH: {
      GET_ALL: 'Get all paragraphs failed',
      GET_BY_ID: 'Get paragraph by id failed',
      CREATE: 'Create paragraph failed',
      UPDATE: 'Update paragraph failed',
      DELETE: 'Delete paragraph failed',
      NOT_FOUND: 'Not found paragraph document'
    },
    UPLOAD: {
      IMAGE: 'Upload image failed',
      BUG: 'Upload bug image failed',
      SOLUTION: 'Upload solution image failed',
      TOO_LARGE: 'File too large'
    }
  },
  SUCCESS_MESSAGES: {
    LOGIN: 'Login successfully.',
    REGISTER: 'Registration successfully.',
    LOGOUT: 'Logout successfully.',
    DATA_RETRIEVAL: 'Data retrieval successfully.',
    DATA_MANIPULATION: 'Data manipulation successfully.',
    OTP: {
      VERIFY: 'OTP verification successfully.',
      RESEND: 'OTP resend successfully.'
    },
    AUTH: {
      GET_ALL: 'Get all user successfully',
      GET_BY_ID: 'Get user profile details by admin successfully',
      UPDATE: 'Successfully update user account',
      INSERT: 'Successfully create user account',
      DELETE: 'Successfully deleted user account ',
      GET_ROLES: 'All user role retrieved successfully.',
      GET_ROLE_BY_ID: 'Get user profile details by admin successfully',
      UPDATE_ROLE: 'Successfully update role user',
      DELETE_ROLE: 'Successfully deleted role user',
      RESET_PASSWORD: 'Reset password successfully.'
    },
    USER: {
      REFRESH_TOKEN: 'Token refreshed successfully.',
      FORGOT_PASSWORD: 'Forgot password request processed successfully.',
      VERIFY_FORGOT_PASSWORD: 'Forgot password verified successfully.',
      RESET_PASSWORD: 'Password reset successfully.',
      CHANGE_PASSWORD: 'Password changed successfully.',
      GET_LIST_ORDER_BY_USER: 'Get list orders by user successfully!',
      GET_ALL: 'All users retrieved successfully.',
      GET_BY_ID: 'User retrieved successfully.',
      GET_PROFILE: 'Profile fetched successfully.',
      UPDATE: 'Updated successfully.',
      SEARCH: 'User search completed successfully.',
      DELETE: 'User deleted successfully.',
      DELETE_MANY_USER: 'Multiple users deleted successfully.',
      GET_ROLE: 'User roles retrieved successfully.',
      EDIT_ROLE: 'User roles edited successfully.',
      GET_FAVORITE_FRIEND: 'List of close friends retrieved successfully.',
      PAGINATION: 'User pagination executed successfully.',
      TEST_TOKEN: 'Token test completed successfully.',
      GET_PRODUCT_FAVORITE: 'Favorite products retrieved successfully.',
      UPLOAD_AVATAR: 'Avatar uploaded successfully.',
      UPLOAD_THUMBNAIL: 'Thumbnail uploaded successfully.',
      UPLOAD_IMAGE: 'Image uploaded successfully.',
      UPLOAD_MUL_IMAGE: 'Multiple images were uploaded successfully.'
    },
    CATEGORY: {
      GET_ALL: 'Get all categories successfully',
      GET_BY_ID: 'Get category by id successfully',
      UPDATE: 'Update category successfully',
      CREATE: 'Create category successfully',
      DELETE: 'Delete category successfully'
    },
    PARAGRAPH: {
      GET_ALL: 'Get all paragraphs successfully',
      GET_BY_ID: 'Get paragraph by id successfully',
      UPDATE: 'Update paragraph successfully',
      CREATE: 'Create paragraph successfully',
      DELETE: 'Delete paragraph successfully'
    },
    EXAM: {
      GET_ALL: 'Get all exams successfully',
      GET_BY_ID: 'Get exam by id successfully',
      UPDATE: 'Update exam successfully',
      CREATE: 'Create exam successfully',
      DELETE: 'Delete exam successfully'
    },
    EXAM_QUESTION: {
      GET_ALL: 'Get all exam questions successfully',
      GET_BY_ID: 'Get exam question by id successfully',
      UPDATE: 'Update exam question successfully',
      CREATE: 'Create exam question successfully',
      DELETE: 'Delete exam question successfully'
    },

    QUESTION: {
      GET_ALL: 'Get all questions successfully',
      GET_BY_ID: 'Get question by id successfully',
      UPDATE: 'Update question successfully',
      CREATE: 'Create question successfully',
      DELETE: 'Delete question successfully'
    },

    IMAGE: {
      GET_ALL: 'Successfully retrieved all images.',
      GET_BY_ID: 'Get detail image by image_id',
      CLEAR: 'Clear all image successfully',
      DELETE: 'Successfully deleted image',
      UPLOAD_IMAGE: 'Image uploaded successfully.',
      UPLOAD_MUL_IMAGE: 'Multiple images were uploaded successfully.'
    }
  },
  VALIDATION_MESSAGES: {
    TITLE: 'Validation error.',
    COMMONS: {
      INVALID_ID: 'Invalid object ID.',
      PAGINATION: {
        INVALID_PAGE: 'Invalid page number.',
        ITEMS_OUT_OF_RANGE: 'Items per page out of valid range.'
      }
    },
    ID_INVALID: 'Id is unvalid',
    ID_IS_REQUIRED: 'Id is required',
    ID_MUST_BE_STRING: 'Id must be string',
    CATEGORIES: {
      NAME: {
        IS_REQUIRED: 'Category name is required.',
        MUST_BE_STRING: 'Category name must be a string.',
        LENGTH_MUST_BE_FROM_3_TO_100: 'Category name length must be between 3 and 100 characters.'
      }
    },
    EXAM: {
      TITLE: {
        IS_REQUIRED: 'Exam title is required.',
        MUST_BE_STRING: 'Exam title must be a string.',
        LENGTH_MUST_BE_FROM_3_TO_200: 'Exam title length must be between 3 and 200 characters.'
      },
      DESCRIPTION: {
        IS_REQUIRED: 'Exam description is required.',
        MUST_BE_STRING: 'Exam description must be a string.',
        LENGTH_MUST_BE_FROM_3_TO_200: 'Exam description length must be between 3 and 200 characters.'
      }
    },
    EXAM_QUESTION: {
      EXAM_ID: {
        IS_REQUIRED: 'Exam ID is required.',
        MUST_BE_STRING: 'Exam ID must be a string.',
        VALID_ID: 'Exam ID must be a valid ID.'
      },
      QUESTION_ID: {
        IS_REQUIRED: 'Question ID is required.',
        MUST_BE_STRING: 'Question ID must be a string.',
        VALID_ID: 'Question ID must be a valid ID.'
      }
    },
    PARAGRAPH: {
      NAME: {
        IS_REQUIRED: 'Paragraph name is required.',
        MUST_BE_STRING: 'Paragraph name must be a string.',
        LENGTH_MUST_BE_FROM_3_TO_100: 'Paragraph name length must be between 3 and 100 characters.'
      }
    },
    BLANK: {
      BLANK_POSITION: {
        IS_REQUIRED: 'Blank position is required.',
        MUST_BE_INTEGER: 'Blank position must be integer.',
        LENGTH_MUST_BE_FROM_3_TO_100: 'Blank position length must be between 3 and 100 characters.'
      },
      PARAGRAPH_ID: {
        IS_REQUIRED: 'Paragraph ID is required.'
      },
      CORRECT_ANSWER: {
        IS_REQUIRED: 'Correct answer is required.',
        MUST_BE_STRING: 'Correct answer must be a string.'
      }
    },

    QUESTIONS: {
      MUST_BE_A_VALID_ID: 'Question ID must be a valid ID.',
      TITLE_IS_REQUIRED: 'Title is required',
      TITLE_MUST_BE_STRING: 'Title must be a string',
      TITLE_LENGTH_BETWEEN_10_AND_100: 'Title length is from 10 to 100 characters',
      DESCRIPTION_IS_REQUIRED: 'Description is required',
      DESCRIPTION_MUST_BE_STRING: 'Description must be a string',
      DESCRIPTION_LENGTH_BETWEEN_10_AND_200: 'Description length is from 10 to 200 characters',
      IMAGE_IS_REQUIRED: 'Image is required',
      IMAGE_MUST_BE_STRING: 'Image must be a string',
      INVALID_IMAGE: 'Invalid image',
      UPDATE_ID_IS_REQUIRED: 'Bug id is required',
      UPDATE_ID_MUST_BE_STRING: 'Bug id must be string',
      STATUS: 'Status is Pending or Public or Deleted',
      QUESTION_TEXT: {
        MUST_BE_A_STRING: 'Question text must be a string.',
        LENGTH_MUST_BE_FROM_3_TO_1000: 'Question text length must be between 3 and 1000 characters.'
      },
      PARAGRAPH_ID: {
        MUST_BE_A_STRING: 'Paragraph ID must be a string.',
        MUST_BE_VALID_OBJECT_ID: 'Paragraph ID must be a valid object ID.'
      },
      CATEGORY_ID: {
        MUST_BE_A_STRING: 'Category ID must be a string.',
        MUST_BE_VALID_OBJECT_ID: 'Category ID must be a valid object ID.'
      },
      IMAGE: {
        MUST_BE_A_STRING: 'Image URL must be a string.',
        MUST_BE_VALID_URL: 'Image URL must be a valid URL.'
      },
      OPTION: {
        IS_REQUIRED: 'Option is required.',
        MUST_BE_A_STRING: 'Option must be a string.',
        LENGTH_MUST_BE_FROM_1_TO_200: 'Option length must be between 1 and 200 characters.'
      },
      ANSWER: {
        IS_REQUIRED: 'Option is required.',
        MUST_BE_A_STRING: 'Option must be a string.',
        LENGTH_MUST_BE_FROM_1_TO_200: 'Option length must be between 1 and 200 characters.'
      }
    },

    UPLOAD: {
      IMAGE: {
        INVALID_IMAGE_EXTENSION: 'Image extension is invalid.',
        INVALID_IMAGE_SIZE: 'Image size is too large.',
        MAX_IMAGE_UPLOAD: 'A maximum of 4 images can be uploaded.'
      }
    },
    USER: {
      COMMONS: {
        NOT_LOGIN: 'You must be logged in to continue.',
        ID_IS_INVALID: 'User ID is invalid.',
        ID_MUST_BE_A_STRING: 'User ID must be a string.',
        ID_CAN_NOT_BE_EMPTY: 'User ID cannot be empty.',
        WITH_ID_IS_NOT_EXIST: 'User with the specified ID does not exist.',
        NOT_ROLE_NOT_SATISFIED: 'You do not have the appropriate role to access these resources.',
        INVALID_INCLUDES: 'Invalid pagination inclusion.',
        EMAIL_OR_PASSWORD_IS_INCORRECT: 'The email or password is incorrect.',
        INVALID_BEARER_TOKEN: 'The bearer token is invalid.',
        HEADER_AUTHORIZATION_IS_INVALID: 'Authorization header is invalid.',

        EMAIL: {
          IS_REQUIRED: 'Email is required.',
          MUST_BE_A_STRING: 'Email must be a string.',
          ACCESSIBILITY: 'The email address does not exist. Please use a valid one or register.',
          NOT_REGISTER: 'Email is not registered.',
          ALREADY_EXISTS: 'Email already exists.',
          VALID_EMAIL: 'Email address is invalid.',
          VALID_DOMAIN: 'Email must end with @gmail.com or @gmail.edu.com.',
          CONTAIN_SPECIAL_CHARACTER: 'Email must contain at least one special character.'
        },
        NEW_PASSWORD: {
          IS_REQUIRED: 'New password is required.',
          MUST_BE_STRONG: 'New password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
          LENGTH_MUST_BE_FROM_8_TO_16: 'New password length must be between 8 and 16 characters.',
          CONTAINS_EMOJI: 'New password cannot contain emojis or whitespace.',
          MUST_BE_A_STRING: 'New password must be a string.',
          NOT_SAME_OLD_PASSWORD: 'New password must not be the same as the old password.'
        },
        PASSWORD: {
          RESET_FAILED: 'Failed to reset password.',
          CHANGE_FAILED: 'Failed to change password.',
          IS_REQUIRED: 'Password is required.',
          MUST_BE_STRONG: 'Password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
          LENGTH_MUST_BE_FROM_8_TO_16: 'Password length must be between 8 and 16 characters.',
          CONTAINS_EMOJI: 'Password cannot contain emojis or whitespace.',
          MUST_BE_A_STRING: 'Password must be a string.',
          NOT_SAME_OLD_PASSWORD: 'New password must not be the same as the old password.'
        },
        CONFIRM_PASSWORD: {
          IS_REQUIRED: 'Confirm_password is required.',
          MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm_password must match the password.',
          MUST_BE_A_STRING: 'Confirm_password must be a string.',
          LENGTH_MUST_BE_FROM_8_TO_16: 'Confirm_password length must be between 8 and 16 characters.',
          MUST_BE_STRONG: 'Confirm_password must meet the strength requirements 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
          CONTAINS_EMOJI: 'Confirm password cannot contain emojis or whitespace.'
        },
        OLD_PASSWORD: {
          IS_REQUIRED: 'Old password is required.',
          IS_INCORRECT: 'Old password is incorrect.'
        }
      },
      TOKEN: {
        EMAIL_VERIFY: {
          IS_REQUIRED: 'An email verification token is required.',
          MUST_BE_A_STRING: 'The email verification token must be a string.'
        },
        ACCESS_TOKEN: {
          IS_REQUIRED: 'An access token is required.',
          MUST_BE_A_STRING: 'The access token must be a string.'
        },
        REFRESH_TOKEN: {
          IS_REQUIRED: 'Refresh token is required for logout.',
          IS_NOT_EXIST: 'The refresh token has been used or does not exist.',
          NOT_FOUND: 'Attempted to delete a non-existent refresh token.',
          MUST_BE_A_STRING: 'The refresh token must be a string.',
          IS_NOT_EXIST_IN_COOKIES: 'There is no refresh token in cookies.'
        }
      },
      ROLE: {
        IS_REQUIRED: 'Role is required',
        INVALID_USER_ROLE: 'User role must be valid.',
        USER_ROLE_CAN_NOT_BE_EMPTY: 'User role cannot be empty.',
        DUL_USER_ROLE: 'Updating to the same role is not allowed.',
        USER_EDIT_ROLE_THEMSELVES: 'Users cannot edit their own role.'
      },

      LOGIN: {
        USER_NOT_FOUND: 'User not found',
        EMAIL_IS_REQUIRED: 'Email is required.',
        EMAIL_MUST_BE_A_STRING: 'Email must be a string.',
        EMAIL_INVALID: 'Email address is invalid',
        EMAIL_ACCESSIBILITY: 'The email address does not exist. Please use a valid one or register.',
        PASSWORD_IS_REQUIRED: 'Password is required.',
        PASSWORD_MUST_BE_A_STRING: 'Password must be a string.',
        PASSWORD_MUST_BE_STRONG: 'Password must be 8-16 characters, including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
        PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password length must be between 8 and 16 characters.',
        PASSWORD_IS_INCORRECT: 'The email or password is incorrect.',
        PASSWORD_CONTAINS_EMOJI: 'Password cannot contains emoji symbol and white space',
        ACCOUNT_IS_UNVERIFIED: 'The account is unverified.',
        ACCOUNT_IS_BANNED: 'The account is banned.',
        ACCOUNT_NOT_FOUND: 'Account not found.',
        ACCOUNT_NOT_EXISTS: 'The user’s account has been removed.'
      },
      REGISTER: {
        INVALID_USERNAME: 'Must be a valid username',
        USERNAME_IS_REQUIRED: 'Username is required.',
        USERNAME_MUST_BE_A_STRING: 'Username must be a string.',
        USERNAME_LENGTH_MUST_BE_FROM_3_TO_30: 'Username length must be between 3 and 30 characters.',
        USERNAME_INCLUDES_MUL_WHITESPACE: 'Username cannot contain multiple consecutive whitespaces.',
        EMAIL_IS_REQUIRED: 'Email is required.',
        EMAIL_MUST_BE_A_STRING: 'Email must be a valid address.',
        EMAIL_ACCESSIBILITY: 'The email address is already in use. Please use a different email.',
        PASSWORD_IS_REQUIRED: 'Password is required.',
        PASSWORD_MUST_BE_A_STRING: 'Password must be a string.',
        PASSWORD_MUST_BE_STRONG: 'Password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
        PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password length must be between 8 and 16 characters.',
        PASSWORD_CAN_NOT_CONTAIN_SPACE: 'Password cannot contain spaces.',
        CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required.',
        CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string.',
        CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must match the password.',
        CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm password must meet the strength requirements: 8-16 characters including at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
        CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Confirm password length must be between 8 and 16 characters.',
        INVALID_PHONE: 'Phone number must be valid.',
        PHONE_MUST_BE_A_STRING: 'Phone must be a string.',
        PHONE_LENGTH_MUST_BE_10_CHARACTER: 'Phone length must be 10 or 11 characters.',
        PHONE_LENGTH_MUST_BE_STRING_NUMBER: 'Phone number must be numeric.',
        PHONE_IS_REQUIRED: 'Phone is required.',
        PHONE_MUST_BE_STRING: 'Phone must be a string.',
        PHONE_IS_INVALID: 'The phone number is invalid. Please enter a valid Vietnamese phone number.'
      },
      VERIFY_OTP: {
        INVALID_OTP: 'Invalid OTP.',
        IS_REQUIRED: 'OTP is required.',
        IS_NOT_EXIST: 'OTP not found.',
        MUST_BE_A_STRING: 'OTP must be a string.',
        OPT_LENGTH_MUST_BE_6: 'OTP length must be 6 characters.',
        NOT_FOUND_OR_ALREADY_VERIFIED: 'User not found or OTP already verified.',
        IS_NUMBERIC: 'OTP must be numeric.',
        IS_EXPIRED: 'OTP has expired.'
      },
      VERIFY_FORGOT_PASSWORD_TOKEN: {
        IS_REQUIRED: 'Forgot_password token is required.',
        MUST_BE_A_STRING: 'Forgot_password token must be a string.',
        LENGTH_MUST_BE_6: 'Forgot_password token length must be 6 characters.',
        IS_NOT_EXIST: 'Forgot_password token not found.',
        IS_EXPIRED: 'Forgot_password token has expired.',
        NOT_FOUND_OR_ALREADY_VERIFIED: 'User not found or forgot_password token already verified.',
        INVALID_TOKEN: 'Invalid forgot_password token.',
        IS_NUMBERIC: 'Forgot_password token must be numeric.'
      },
      PROFILE: {
        FIELD_UPDATE_IS_REQUIRED: 'At least one field must be specified for updating.',
        INVALID_USERNAME: 'USERname must be valid.',
        USERNAME_INCLUDES_MUL_WHITESPACE: 'Username cannot contain multiple consecutive whitespaces.',
        USERNAME_MUST_BE_A_STRING: 'Username must be a string.',
        USERNAME_MAX_LENGTH_IS_50: 'Username length must be between 4 and 50 characters.',
        INVALID_PHONE: 'Phone number must be valid.',
        PHONE_MUST_BE_A_STRING: 'Phone must be a string.',
        PHONE_LENGTH_MUST_BE_10_CHARACTER: 'Phone length must be 10 or 11 characters.',
        PHONE_LENGTH_MUST_BE_STRING_NUMBER: 'Phone number must be numeric.',
        PHONE_IS_REQUIRED: 'Phone is required.',
        PHONE_MUST_BE_STRING: 'Phone must be a string.',
        PHONE_IS_INVALID: 'The phone number is invalid. Please enter a valid Vietnamese phone number.',
        GENDER_MUST_BE_STRING: 'Gender must be a string.',
        GENDER_IS_INVALID: 'Gender is invalid. Please specify as Male, Female, Other, etc.',
        AVATAR_MUST_BE_STRING: 'Avatar image must be a string.',
        VALID_URL_AVATAR: 'Avatar URL must be valid and have a valid image extension.',
        VALID_URL_COVER_PHOTO: 'Cover photo URL must be valid and have a valid image extension.',
        COVER_PHOTO_MUST_BE_STRING: 'Cover photo must be a string.',
        INVALID_ADDRESS: 'Address must be valid.',
        ADDRESS_MUST_BE_STRING: 'Address must be a string.',
        ADDRESS_LENGTH_IS_INVALID: 'Address length must be between 10 and 200 characters.',
        ADDRESS_INCLUDES_MUL_WHITESPACE: 'Address cannot contain multiple consecutive whitespaces.'
      }
    }
  },
  CLOUDINARY: {
    KEY: 'Key to access cloudinary',
    SECRET: 'Password to access cloudinary',
    NAME: 'Cloud name of current cloudinary account',
    AVATAR_FOLDER: 'Folder that contain avatar images on cloudinary',
    BUGS_FOLDER: 'Folder that contain bugs images on cloudinary',
    SOLUTIONS_FOLDER: 'Folder that contain solutions images on cloudinary'
  }
}
