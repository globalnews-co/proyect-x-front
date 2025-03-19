import React, { useRef, useState } from 'react';
import '../../Assets/customslider.css';

const CustomSlider = ({ children, onSlideChange }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
    onSlideChange(index);
  };

  const handleNext = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < children.length) {
      handleSlideChange(newIndex);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      handleSlideChange(newIndex);
    }
  };

  return (
    <div className="custom-slider">
      <div className="slider-container" ref={containerRef}>
        <div className="slider-content" >
          {React.Children.map(children, (child, index) => (
            React.cloneElement(child, {
              key: index,
              style: { flex: `0 0 ${100 / children.length}%` },
            })
          ))}
        </div>
      </div>
      <button className="slider-button prev" onClick={handlePrev}><i className="bi bi-chevron-left"/></button>
      <button className="slider-button next" onClick={handleNext}><i className="bi bi-chevron-right"/> </button>
    </div>
  );
};

export default CustomSlider;
