// Abhimanyu Meel
// React Component to display the circular progress bar

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear, faSadCry, faGrinBeam } from '@fortawesome/free-solid-svg-icons';

const CircularProgBar = ({ percentage, cardName }) => {
    const [progress, setProgress] = useState(0); // Single state variable for both text and animatedPercentage
    const radius = 100;
    const stroke = 15;
    const normalizedRadius = radius - stroke;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;  // Use progress

    useEffect(() => {
      let animationFrameId;

      const animateProgress = () => {
          setProgress(prevProgress => {
              if (prevProgress < percentage) {
                  return prevProgress + 1;
              } else if (prevProgress > percentage) {
                  return prevProgress - 1;
              } else {
                  return prevProgress;
              }
          });

          if (progress < percentage || progress > percentage) {
              animationFrameId = requestAnimationFrame(animateProgress);
          }
      };

      animateProgress();

      return () => cancelAnimationFrame(animationFrameId);
  }, [percentage, progress]);

    let icon;
    if (percentage < 75 && percentage >= 50) {
        icon = <FontAwesomeIcon icon={faSadTear} size="2x" />;
    } else if (percentage < 50) {
        icon = <FontAwesomeIcon icon={faSadCry} spin size="2x" />;
    } else if (percentage >= 75) {
        icon = <FontAwesomeIcon icon={faGrinBeam} bounce size="2x" />;
    }

    return (
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'inline-block',
        margin: '10px'
      }}>
        <h4 style={{textAlign: 'center'}}>{cardName}</h4>
        <div style={{textAlign: 'center'}}>
          {icon}
        </div>
        <svg
          height={radius * 2}
          width={radius * 2}
        >
          <circle // Outer border
            stroke="#EDF1F4"
            fill="transparent"
            strokeWidth={stroke / 15}
            r={radius - stroke / 2.3}
            cx={radius}
            cy={radius}
          />
           <circle // Progress bar
              stroke= {percentage < 75 ? "red" : "#00FF40"}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          <circle // Inner border
            stroke="#EDF1F4"
            fill="transparent"
            strokeWidth={stroke / 15}
            r={normalizedRadius - stroke / 1.8}
            cx={radius}
            cy={radius}
          />
          <text
            x="50%"
            y="50%"
            dy=".3em" //vertical alignment of the text
            textAnchor="middle"
            fontSize="20px"
            fill="black"
          >
            {`${progress}%`}
          </text>
        </svg>
      </div>
    );
};

export default CircularProgBar;