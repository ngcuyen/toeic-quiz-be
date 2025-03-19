export const generateEmailContent = async (otpCode: string): Promise<string> => {
  // Ideally, load this template from an external file or use a templating library
  return `<div
      style="font-family:Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;background-image: url('https://i.pinimg.com/originals/ac/71/99/ac71991f2c80919102eb0a2f7936a9cf.png'); background-size: contain; object-fit: cover; ">
      <div
        style="margin: 50px auto; width: 50%; padding: 20px 0; background-color: #f1f0f0dd; border-radius: 10px; box-shadow: 0 0 10px #d1cececc;">
        <div style="display: flex; justify-content: center; margin: 4px 0px; ">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 40.000000 40.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
              <path
                d="M139 330 c-9 -25 -14 -28 -30 -19 -24 12 -39 4 -39 -23 0 -12 8 -22 21 -25 17 -5 19 -11 14 -43 -5 -27 -2 -42 10 -53 14 -15 14 -19 1 -40 -11 -16 -13 -32 -8 -52 8 -29 10 -29 78 -30 65 -1 118 15 136 39 10 15 -10 46 -26 40 -22 -9 -39 31 -20 47 9 7 14 25 12 43 -2 23 2 34 17 41 23 12 32 42 17 57 -6 6 -19 4 -36 -7 -18 -12 -26 -13 -26 -5 0 6 9 14 20 17 24 6 25 16 5 33 -12 10 -21 8 -49 -11 l-35 -23 28 -12 c37 -16 55 -65 41 -110 -9 -25 -20 -35 -54 -46 -41 -14 -45 -13 -72 9 -18 14 -24 23 -14 23 13 1 13 2 -1 13 -21 17 -8 76 24 102 14 11 28 30 32 43 5 18 2 22 -15 22 -14 0 -24 -9 -31 -30z m-9 -44 c0 -2 -11 -3 -25 -2 -25 1 -31 7 -19 19 6 6 44 -9 44 -17z m190 5 c0 -5 -11 -11 -25 -13 -26 -5 -35 6 -12 15 20 9 37 8 37 -2z m-140 -208 c0 -23 -20 -14 -30 13 -18 45 -12 62 10 29 11 -16 20 -36 20 -42z m92 33 c6 -14 7 -33 4 -43 -7 -17 -8 -17 -17 0 -6 9 -19 17 -29 17 -12 0 -20 -7 -21 -17 -1 -17 -2 -17 -6 -1 -2 9 1 27 7 40 11 22 10 22 -4 4 -9 -11 -19 -16 -23 -13 -10 11 29 36 55 37 14 0 26 -9 34 -24z m-132 -18 c0 -5 -7 -8 -15 -8 -17 0 -18 2 -9 25 5 13 8 14 15 3 5 -7 9 -16 9 -20z" />
              <path
                d="M133 228 c2 -7 10 -12 17 -10 8 2 11 -4 7 -17 -7 -28 13 -43 36 -27 23 18 22 25 -5 18 -15 -4 -19 -2 -14 7 5 7 0 18 -10 26 -24 18 -37 19 -31 3z" />
              <path d="M212 228 c5 -15 28 -18 29 -3 0 6 -7 12 -17 13 -10 3 -15 -1 -12 -10z" />
              <path d="M230 190 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0 -15 -4 -15 -10z" />
            </g>
          </svg>
        </div>
        <div style=" border-radius: 10px; margin: 0 80px; background-color: #ffffff;">
          <div
            style="background-image: url('https://i.pinimg.com/originals/f0/9f/84/f09f84882da5c586106b6b26b0bbae1b.png'); background-repeat: no-repeat; background-size: contain; object-fit: cover; width: 416px; height: 212px; margin-left: auto; border-radius: 10px; margin-right: auto;">
          </div>
          <h1 style="text-align: center; font-weight: 800;">Verify your email address</h1>
          <p style="text-align: center; font-size: 16px; font-weight: 600; margin: 0 0 10px; color: black;">Welcome to <a
              href="">Hutech Bug</a></p>
          <p style="margin: 8px 80px; text-align: center; font-size: 15px; font-weight: 600; color: black;">Please use the
            following OTP
            bellow to confirm your email address and activate your account.</p>
          <div
            style="width: 174px; background-color: #ff0342; border-radius: 20px; font-size: 24px; font-weight: 600; letter-spacing: 4px; color: #fff; margin: 18px auto; text-align: center;">
            ${otpCode}</div>
          <p style="margin: 8px 20px 10px; text-align: center; font-size: 12px; color: #9E9E9E;">This OTP is
            valid for only 5 minutes and can be used only once. If you did not request this, please ignore this email or
            contact support if you have concerns.</p>
        </div>
      </div>
    </div>` // Simplified for brevity
}

export const generateEmailContentPwd = async (otpCode: string): Promise<string> => {
  // Ideally, load this template from an external file or use a templating library
  return `<div
      style="font-family:Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;background-image: url('https://i.pinimg.com/originals/ac/71/99/ac71991f2c80919102eb0a2f7936a9cf.png'); background-size: contain; object-fit: cover; ">
      <div
        style="margin: 50px auto; width: 50%; padding: 20px 0; background-color: #f1f0f0dd; border-radius: 10px; box-shadow: 0 0 10px #d1cececc;">
        <div style="display: flex; justify-content: center; margin: 4px 0px; ">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 40.000000 40.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
              <path
                d="M139 330 c-9 -25 -14 -28 -30 -19 -24 12 -39 4 -39 -23 0 -12 8 -22 21 -25 17 -5 19 -11 14 -43 -5 -27 -2 -42 10 -53 14 -15 14 -19 1 -40 -11 -16 -13 -32 -8 -52 8 -29 10 -29 78 -30 65 -1 118 15 136 39 10 15 -10 46 -26 40 -22 -9 -39 31 -20 47 9 7 14 25 12 43 -2 23 2 34 17 41 23 12 32 42 17 57 -6 6 -19 4 -36 -7 -18 -12 -26 -13 -26 -5 0 6 9 14 20 17 24 6 25 16 5 33 -12 10 -21 8 -49 -11 l-35 -23 28 -12 c37 -16 55 -65 41 -110 -9 -25 -20 -35 -54 -46 -41 -14 -45 -13 -72 9 -18 14 -24 23 -14 23 13 1 13 2 -1 13 -21 17 -8 76 24 102 14 11 28 30 32 43 5 18 2 22 -15 22 -14 0 -24 -9 -31 -30z m-9 -44 c0 -2 -11 -3 -25 -2 -25 1 -31 7 -19 19 6 6 44 -9 44 -17z m190 5 c0 -5 -11 -11 -25 -13 -26 -5 -35 6 -12 15 20 9 37 8 37 -2z m-140 -208 c0 -23 -20 -14 -30 13 -18 45 -12 62 10 29 11 -16 20 -36 20 -42z m92 33 c6 -14 7 -33 4 -43 -7 -17 -8 -17 -17 0 -6 9 -19 17 -29 17 -12 0 -20 -7 -21 -17 -1 -17 -2 -17 -6 -1 -2 9 1 27 7 40 11 22 10 22 -4 4 -9 -11 -19 -16 -23 -13 -10 11 29 36 55 37 14 0 26 -9 34 -24z m-132 -18 c0 -5 -7 -8 -15 -8 -17 0 -18 2 -9 25 5 13 8 14 15 3 5 -7 9 -16 9 -20z" />
              <path
                d="M133 228 c2 -7 10 -12 17 -10 8 2 11 -4 7 -17 -7 -28 13 -43 36 -27 23 18 22 25 -5 18 -15 -4 -19 -2 -14 7 5 7 0 18 -10 26 -24 18 -37 19 -31 3z" />
              <path d="M212 228 c5 -15 28 -18 29 -3 0 6 -7 12 -17 13 -10 3 -15 -1 -12 -10z" />
              <path d="M230 190 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0 -15 -4 -15 -10z" />
            </g>
          </svg>
        </div>
        <div style=" border-radius: 10px; margin: 0 80px; background-color: #ffffff;">
          <div
            style="background-image: url('https://i.pinimg.com/originals/f0/9f/84/f09f84882da5c586106b6b26b0bbae1b.png'); background-repeat: no-repeat; background-size: contain; object-fit: cover; width: 416px; height: 212px; margin-left: auto; border-radius: 10px; margin-right: auto;">
          </div>
          <h1 style="text-align: center; font-weight: 800;">Reset your password</h1>
          <p style="text-align: center; font-size: 16px; font-weight: 600; margin: 0 0 10px; color: black;">Hey, <a
              href="">We are Hutech Bug Teams</a></p>
          <p style="margin: 8px 80px; text-align: center; font-size: 15px; font-weight: 600; color: black;">Please use the
            following OTP
            bellow to reset your password.</p>
          <div
            style="width: 174px; background-color: #ff0342; border-radius: 20px; font-size: 24px; font-weight: 600; letter-spacing: 4px; color: #fff; margin: 18px auto; text-align: center;">
            ${otpCode}</div>
          <p style="margin: 8px 20px 10px; text-align: center; font-size: 12px; color: #9E9E9E;">This OTP is
            valid for only 5 minutes and can be used only once. If you did not request this, please ignore this email or
            contact support if you have concerns.</p>
        </div>
      </div>
    </div>` // Simplified for brevity
}
