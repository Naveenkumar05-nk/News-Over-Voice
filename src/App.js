
import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

import wordsToNumbers from 'words-to-numbers';

const alankey = 'e5c918211d57c50283bfad6cd1df714a2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
    
    // To create the Alan button 
    useEffect(() => {
        alanBtn({
            key: alankey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight') {

                    // to Roll the highlight bar to the next article
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > 20) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                }
            },
        });
    }, [])
    return (
        <div>
            <div>
                <h1 style={{textAlign : 'center', fontFamily : 'sans-serif'}}>News Over Voice 📢</h1>
            </div>
            <div className={classes.logoContainer}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUlShqg2SZ3KrxNh1nvHjav7mSZxp-81GkMw&usqp=CAU" className={classes.alanLogo} alt="alan-logo"/>

            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}


export default App;