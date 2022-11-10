import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { nodeListState } from '../../atoms/makeListAtoms';
import { useRoadMap } from '../../hooks/useRoadmap';
import { getLinePositions, MemoizedLines as Lines } from './Lines';
import renderNodes from './Nodes';
import { createTree, getRenderedPositions, initializeNodeRefs } from './utils';

export const SUBTREE_DIRECTION = { LEFT: false, RIGHT: true };
export const NODE_TYPE = { MAIN: 'MAIN', SUB: 'SUB' };

export default function RoadMap() {
  const [tree, setTree] = useState();
  const [lines, setLines] = useState([]);
  const renderedNodes = useRef();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { data } = useRoadMap();
  const nodesFromEditing = useRecoilValue(nodeListState);

  const nodes = useMemo(
    () => renderNodes(tree, renderedNodes.current),
    [tree, screenSize],
  );

  useEffect(() => {
    const onWindowResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  useLayoutEffect(() => {
    console.log(nodesFromEditing);
    if (nodesFromEditing.length > 0) {
      renderedNodes.current = initializeNodeRefs(nodesFromEditing);
      // console.log('renderedNodes:', renderedNodes);
      setTree(createTree(nodesFromEditing, nodesFromEditing[0].idx));
    }
  }, [data]);

  useLayoutEffect(() => {
    tree &&
      renderedNodes.current &&
      getRenderedPositions(tree, renderedNodes.current);
  }, [tree, screenSize]);

  useLayoutEffect(() => {
    tree && setLines(getLinePositions(tree, renderedNodes.current));
  }, [tree, screenSize]);

  // console.log(
  //   'data from query',
  //   data,
  //   'from editing:',
  //   nodesFromEditing,
  //   'tree:',
  //   tree,
  // );

  return (
    <Container>
      <Canvas>
        <Lines lines={lines} />
        {nodes}
      </Canvas>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 800px;
`;
const Canvas = styled.div`
  position: relative;
  width: 100%;
  justify-content: center;
`;
