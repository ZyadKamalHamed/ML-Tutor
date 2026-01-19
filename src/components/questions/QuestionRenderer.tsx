import type { Question } from '../../types';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { FillBlankQuestion } from './FillBlankQuestion';
import { ExplainCodeQuestion } from './ExplainCodeQuestion';
import { FlashcardQuestion } from './FlashcardQuestion';
import { SpotBugQuestion } from './SpotBugQuestion';
import { PredictOutputQuestion } from './PredictOutputQuestion';

interface QuestionRendererProps {
  question: Question;
  onSubmit: (answer: string | string[]) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

export function QuestionRenderer({
  question,
  onSubmit,
  showResult = false,
  isCorrect = false
}: QuestionRendererProps) {
  const handleSubmit = (answer: string | string[]) => {
    onSubmit(answer);
  };

  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoiceQuestion
          question={question}
          onSubmit={handleSubmit}
          showResult={showResult}
          isCorrect={isCorrect}
        />
      );

    case 'fill-blank':
      return (
        <FillBlankQuestion
          question={question}
          onSubmit={handleSubmit}
          showResult={showResult}
          isCorrect={isCorrect}
        />
      );

    case 'explain-code':
      return (
        <ExplainCodeQuestion
          question={question}
          onSubmit={handleSubmit}
          showResult={showResult}
          isCorrect={isCorrect}
        />
      );

    case 'flashcard':
      return (
        <FlashcardQuestion
          question={question}
          onSubmit={handleSubmit}
          showResult={showResult}
        />
      );

    case 'spot-bug':
      return (
        <SpotBugQuestion
          question={question}
          onSubmit={handleSubmit}
          showResult={showResult}
          isCorrect={isCorrect}
        />
      );

    case 'predict-output':
      return (
        <PredictOutputQuestion
          question={question}
          onSubmit={handleSubmit}
          showResult={showResult}
          isCorrect={isCorrect}
        />
      );

    default:
      return (
        <div className="text-center text-red-600">
          Unknown question type: {question.type}
        </div>
      );
  }
}
