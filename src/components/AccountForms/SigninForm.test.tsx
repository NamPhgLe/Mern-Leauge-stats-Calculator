import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInForm from './SigninForm';
import { vi } from 'vitest';

describe('SignInForm', () => {
    it('renders email and password inputs and a sign-in button', () => {
        const mockSignIn = vi.fn();
        render(<SignInForm onSignIn={mockSignIn} />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('calls onSignIn with email and password on submit', async () => {
        const mockSignIn = vi.fn();
        render(<SignInForm onSignIn={mockSignIn} />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const button = screen.getByRole('button', { name: /sign in/i });

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');
        await userEvent.click(button);

        expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(mockSignIn).toHaveBeenCalledTimes(1);
    });
});
