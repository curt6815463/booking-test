import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RoomListItem = ({ roomNumber, index, isAdult, room, onNumberChange }) => {
  const defaultValue = isAdult ? room.min : 0;
  const [number, setNumberState] = useState(defaultValue);
  const setData = (value) => {
    if (roomNumber === room.max && value > number) {
      return alert(`超過最大人數 ${room.max}人`);
    }
    return setNumberState(Math.max(value, 0));
  };
  const setNumberAction = (diff) => {
    setData(number + diff);
  };
  const handleNumberChange = (event) => {
    setData(event.target.value);
  };

  useEffect(() => {
    onNumberChange({ index, number, isAdult });
  }, [number]);

  return (
    <RoomPeopleNumberItem>
      <ItemName>
        <div>{isAdult ? "大人" : "小孩"}</div>
        <div>{isAdult ? "年齡 20+" : "年齡 0+"}</div>
      </ItemName>
      <NumberSetter>
        <MinusBtn onClick={() => setNumberAction(-1)}>
          <Bar rotate={"0deg"}></Bar>
        </MinusBtn>
        <NumberInput
          value={number}
          onChange={(e) => handleNumberChange(e)}
          type="number"
        ></NumberInput>
        <PluxBtn onClick={() => setNumberAction(1)}>
          <Bar rotate={"0deg"}></Bar>
          <Bar rotate={"90deg"}></Bar>
        </PluxBtn>
      </NumberSetter>
    </RoomPeopleNumberItem>
  );
};

const useDefaultRoomsNumberList = (length) => {
  return new Array(length).fill(null).map(() => ({ adult: 0, child: 0 }));
};

const Distribution = ({ people, rooms, onDistribution }) => {
  const defaultRoomsNumberList = useDefaultRoomsNumberList(rooms.length);
  const [roomsNumberList, setRoomsNumberList] = useState(
    defaultRoomsNumberList
  );

  const onNumberChange = ({ index, number, isAdult }) => {
    const newData = [...roomsNumberList];
    if (isAdult) {
      newData[index]["adult"] = number;
    } else {
      newData[index]["child"] = number;
    }
    setRoomsNumberList(newData);
  };

  const sumRoomNumber = ({ index, roomsNumberList }) => {
    return roomsNumberList[index].adult + roomsNumberList[index].child;
  };

  const distribution = () => {
    const sumAllRoomNumber = roomsNumberList.reduce((result, item) => {
      return result + item.adult + item.child;
    }, 0);

    if (sumAllRoomNumber < people) {
      return window.alert("人數尚未分配完");
    } else if (sumAllRoomNumber > people) {
      return window.alert("分配人數過多");
    }
    onDistribution(roomsNumberList);
  };
  return (
    <Wrapper>
      <Title>
        住客人數：{people} 人 / {rooms.length} 房
      </Title>
      <RoomsListWrapper>
        {rooms.map((room, index) => {
          return (
            <RoomList key={index}>
              <TotalCount>
                房間：{sumRoomNumber({ index, roomsNumberList })}人
              </TotalCount>
              <RoomListItem
                roomNumber={sumRoomNumber({ index, roomsNumberList })}
                onNumberChange={onNumberChange}
                index={index}
                isAdult
                room={room}
              />
              <RoomListItem
                roomNumber={sumRoomNumber({ index, roomsNumberList })}
                onNumberChange={onNumberChange}
                index={index}
                room={room}
              />
            </RoomList>
          );
        })}
      </RoomsListWrapper>
      <ButtonWrappe>
        <SubmitButton onClick={distribution}>handleDistribution</SubmitButton>
      </ButtonWrappe>
    </Wrapper>
  );
};
Distribution.prototype = {
  people: PropTypes.number,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    })
  ),
  handleDistribution: () => null,
};

const Wrapper = styled.div`
  width: 375px;
  margin: 0 auto;
`;
const Title = styled.div`
  margin: 16px 0;
  font-weight: 700;
`;

const RoomList = styled.div`
  margin-top: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const TotalCount = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
`;
const RoomPeopleNumberItem = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
const RoomsListWrapper = styled.div``;

const ItemName = styled.div`
  flex: 1;
  div:nth-child(1) {
    font-size: 14px;
    color: #000;
  }
  div:nth-child(2) {
    font-size: 14px;
    color: #8c8c8c;
  }
`;

const NumberSetter = styled.div`
  display: flex;
`;

const MinusBtn = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border: 1px solid #1e9fd2;
`;

const NumberInput = styled.input`
  padding: 0;
  margin: 0 8px;
  width: 40px;
  height: 40px;
  outline: none;
  border: 1px solid #bfbfbf;
  text-align: center;
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

const PluxBtn = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #1e9fd2;
  position: relative;
`;

const Bar = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #1e9fd2;
  width: 20px;
  height: 1.5px;
  transform: translate(-50%, -50%) ${({ rotate }) => `rotate(${rotate})`};
  transform-origin: center;
`;

const ButtonWrappe = styled.div``;

const SubmitButton = styled.button`
  outline: none;
  border: 1px solid #1e9fd2;
  background-color: #fff;
  width: 100%;
  padding: 8px;
`;

export default Distribution;
