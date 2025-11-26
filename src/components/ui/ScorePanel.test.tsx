import { render } from '@testing-library/react';
import ScorePanel from './ScorePanel';

describe('Score Panel', () => {
  it('renders with user name when no current user', () => {
    const {getByText, getByTestId} = render(<ScorePanel 
      score={4} 
      numberCorrectAnswers={4}
      timeBonus={0}
      user="RARRIBAS"
      isCurrentUser={false}
    />)
    
    expect(getByText("RARRIBAS")).toBeInTheDocument();
    expect(getByTestId("panel-test")).toHaveClass('bg-gray-100 border-gray-300');
  });

  it('renders with you when current user', () => {
    const {getByText, getByTestId} = render(<ScorePanel 
      score={4} 
      numberCorrectAnswers={4}
      timeBonus={0}
      user="RARRIBAS"
      isCurrentUser={true}
    />)

    expect(getByText("You")).toBeInTheDocument();
    expect(getByTestId("panel-test")).toHaveClass('bg-blue-100 border-blue-300');
  });
})