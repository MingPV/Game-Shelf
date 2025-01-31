import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/counter'


describe('Counter Component', () => {
  it('should start with count 0', () => {
    render(<Counter/>);
    const countElement = screen.getByTestId('count');
    expect(countElement).toHaveTextContent('0');
  });

  it('should increment count by 1 when the button is clicked', () => {
    render(<Counter/>);
    
    const countElement = screen.getByTestId('count');
    const button = screen.getByText('Increment');
    
    // Click the button once
    fireEvent.click(button);
    expect(countElement).toHaveTextContent('1');
    
    // Click the button again
    fireEvent.click(button);
    expect(countElement).toHaveTextContent('2');
  });
});
