import { Alert, Pressable } from 'react-native';
import React from 'react';

const TextMap = ({ blocks }) => {
  return blocks.map(block => (
    <React.Fragment key={block.text + Math.random()}>
      {block.lines.map(line =>
          line.elements.map(el => (
            <Pressable
              onPress={() => Alert.alert(el.text)}
              key={Math.random()}
              style={[el.frame]}
              className={"absolute bg-slate-600/25 rounded-md"}
            />
          )),
        )}
  </React.Fragment>
    ));
};

export default TextMap;