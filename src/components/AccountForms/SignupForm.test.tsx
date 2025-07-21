import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from './SignupForm';

describe('SignupForm', () => {
    it('renders email and password inputs and a sign-up button', () => {
        const mockSignUp = vi.fn();
        render(<SignupForm onSignUp={mockSignUp} />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('calls onSignUp with email and password on submit', () => {
        const mockSignUp = vi.fn();
        render(<SignupForm onSignUp={mockSignUp} />);

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'securepass' },
        });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'securepass');
    });
});
