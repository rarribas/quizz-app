import { render, waitFor } from '@testing-library/react';
import MyScorePanel from "./MyScorePanel";
import { getRanking } from '@/app/actions/quizz-actions';

jest.mock("@/app/actions/quizz-actions", () => ({
  getRanking: jest.fn(),
}));

describe('My Score Panel', () => {
  it('renders my score panel with the correct info', () => {
    const {getByText} = render(<MyScorePanel 
      score={4} 
      numberCorrectAnswers={4}
      timeBonus={0}
    />)
    
    expect(getByText("0 seconds bonus")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("4/10 correct")).toBeInTheDocument();
  });

  it("renders with correct ranking when ranking received", async () =>{
    (getRanking as jest.Mock).mockResolvedValue(3);

    const {findByText} = render(<MyScorePanel 
      score={4} 
      numberCorrectAnswers={4}
      timeBonus={0}
    />)
    
    expect(await findByText("Ranking #3")).toBeInTheDocument();
  })
  it("renders without ranking when no ranking received", async () =>{
    (getRanking as jest.Mock).mockResolvedValue(null);

    const {queryByText} = render(<MyScorePanel 
      score={4} 
      numberCorrectAnswers={4}
      timeBonus={0}
    />)

    await waitFor(() => {
      expect(queryByText(/Ranking/i)).not.toBeInTheDocument();
    });
  })
});

