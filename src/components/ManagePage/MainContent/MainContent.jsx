import { Route } from 'react-router-dom';
import styles from './MainContent.module.scss';
import Cars from './Sections/Cars';

const MainContent = () => {
  return (
    <div className={styles.contentWrapper}>
      <Route exact path="/manage/cars" render={() => <Cars/>}/>
    </div>
  )
}

export default MainContent;