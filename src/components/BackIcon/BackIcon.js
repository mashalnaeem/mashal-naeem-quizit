
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function BackIcon({ className }) {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={className} onClick={goBack}>
      <FaArrowLeft />
    </div>
  );
};

export default BackIcon;
