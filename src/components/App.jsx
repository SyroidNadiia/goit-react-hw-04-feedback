import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const App = () => {
  const [feetbackState, setfeetbackState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = feedback => {
    setfeetbackState(prevState => ({
      ...prevState,
      [feedback]: prevState[feedback] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feetbackState;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? (feetbackState.good / total) * 100 : 0;
  };

  const totalFeedback = countTotalFeedback();
  const positiveFeedbackPercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feetbackState}
          onLeaveFeedback={handleClick}
        ></FeedbackOptions>
      </Section>
      {totalFeedback ? (
        <Section title="Statistics">
          <Statistics
            good={feetbackState.good}
            neutral={feetbackState.neutral}
            bad={feetbackState.bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          ></Statistics>
        </Section>
      ) : (
        <Notification message="There is no feedback"></Notification>
      )}
    </>
  );
};

export default App;
