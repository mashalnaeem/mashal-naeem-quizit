
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackIcon = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="back-icon" onClick={goBack}>
      <FaArrowLeft />
    </div>
  );
};

export default BackIcon;
