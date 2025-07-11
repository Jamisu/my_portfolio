import React from 'react';
import './index.scss';
import { FontAwesomeIcon, FontAwesomeIconProps as Props } from '@fortawesome/react-fontawesome';

interface BigIconProps {
  ease: string;
  index: number;
  icon: any;
  size?: any;
  color?: string;
  onClickHandler: (index: number) => void;
  onHoverHandler: (index: number) => void;
  selectedId: number;
}

const BigIcon: React.FC<BigIconProps> = ({
  ease,
  index,
  icon,
  size = '10x',
  color = '#ffff00',
  onClickHandler,
  onHoverHandler,
  selectedId,
}) => {
  const FontAwe = <FontAwesomeIcon className='awe' icon={icon} size={size} />;

  const localOnClick = () => {
    onClickHandler(index);
  };

  const localOnHover = () => {
    onHoverHandler(index);
  };

  return (
    <button
      className={`bigIcon ${ease} _${index + 1} ${selectedId === index && 'active'}`}
      onClick={localOnClick}
      onMouseOver={localOnHover}
    >
      {FontAwe}
    </button>
  );
};

export default BigIcon;