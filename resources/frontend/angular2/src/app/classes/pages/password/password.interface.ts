export interface ForgottenPassword
{
    email: string
}

export interface PasswordReset extends ForgottenPassword
{
    password: string,
    password_confirmation: string;
    token: string
}

export interface PasswordChange
{
    current_password: string,
    new_password: string,
    new_password_confirmation: string;
}

export interface ForceChangePassword
{
    user_id: number,
    password: string,
    password_confirmation: string;
}
