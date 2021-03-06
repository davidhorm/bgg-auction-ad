import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { fetchGeekListJson } from './services/fetch.service';
import { getGeekListItems } from './services/geeklist.service';
import { generateText } from './services/bgg-formatter.service';

import './App.css';

const useStyles = makeStyles({
  root: {
    display: 'block',
    margin: '1em',
  }
});

const App = () => {
  const [geekListId, setGeekListId] = useState('');

  const [imageSize, setImageSize] = useState('table');
  const onImageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => setImageSize(event.target.value);

  const [generatedText, setGeneratedText] = useState('');

  const classes = useStyles();

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneratedText('loading');
    const geekListJson = await fetchGeekListJson(geekListId);

    if (geekListJson && geekListJson.geeklist) {
      const geekListItems = getGeekListItems(geekListJson);
      const text = generateText(geekListId, geekListItems, imageSize);
      setGeneratedText(text);
    }
    else if (geekListJson.message) {
      setGeneratedText(geekListJson.message);
    }
    else {
      setGeneratedText(geekListJson);
    }
  };

  const imageRadioLabel = 'Image Size (and Location)';

  return (
    <div className="App">
      <h1>BGG Auction Ad Generator</h1>
      <div>
        Do you have a GeekList Auction on <a href="https://www.boardgamegeek.com/">BoardGameGeek</a>? Do you want to display a
        gallery of the box art and links to your auction items? Use this tool to generate text to copy and paste into a BGG post.
      </div>

      <form onSubmit={onFormSubmit}>

        <TextField
          className={classes.root}
          id="geeklist-id"
          label="GeekList ID"
          variant="outlined"
          type="number"
          value={geekListId}
          onChange={e => setGeekListId(e.target.value)}
        />

        <FormControl component="fieldset" className={classes.root}>
          <FormLabel component="legend">{imageRadioLabel}</FormLabel>
          <RadioGroup aria-label={imageRadioLabel} name="image-size-location" value={imageSize} onChange={onImageSizeChange}>
            <FormControlLabel value="table-geeklist" label="Square (Table in GeekList)" control={<Radio />} />
            <FormControlLabel value="table-forum" label="Square (Table in Forum)" control={<Radio />} />
            <FormControlLabel value="small" label="Small (Gallery)" control={<Radio />} />
            <FormControlLabel value="square" label="Square  (Gallery)" control={<Radio />} />
            <FormControlLabel value="micro" label="Micro  (Gallery)" control={<Radio />} />
            <FormControlLabel value="hidden" label="None" control={<Radio />} />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="primary" type="submit" className={classes.root}>
          Generate
        </Button>

      </form>

      <h3>Generated Text</h3>
      <textarea className="generated-text" value={generatedText || ''} readOnly></textarea>
    </div>
  );
}

export default App;
