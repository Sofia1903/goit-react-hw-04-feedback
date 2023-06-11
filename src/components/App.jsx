import { useState } from 'react';
import { Statistics } from 'components/Statistics/Statistics';
import { Section } from 'components/Helpers/Section';
import { Notification } from './Helpers/Notification';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';

export const App = () => {
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);

  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    const totalArr = Object.values(state);
    return totalArr.reduce((acc, value) => (acc += value), 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((state.good / countTotalFeedback()) * 100);
  };

  const onLeaveFeedback = ({ target }) => {
    setState(prevState => ({
      ...prevState,
      [target.name]: prevState[target.name] + 1,
    }));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please live feedback">
        <FeedbackOptions
          options={Object.keys(state)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {isNaN(countPositiveFeedbackPercentage()) && (
          <Notification message="There is no feedback" />
        )}

        {!isNaN(countPositiveFeedbackPercentage()) && (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
};
