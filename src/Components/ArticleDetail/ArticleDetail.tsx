import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
 

  return (
    <div>
      {/* Display article details */}
    </div>
  );
}

export default ArticleDetail;
