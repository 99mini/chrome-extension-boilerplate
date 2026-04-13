import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
`;

export const Input = styled.input`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

export const DeleteButton = styled.button`
  background-color: #f00;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;
