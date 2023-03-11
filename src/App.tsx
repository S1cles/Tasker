import React, { useRef } from "react";
import {
  ChakraProvider,
  Box,
  theme,
  Button,
  Center,
  Img,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  List,
  ListItem,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useTaskStore } from "./Store/index";
import uuid from "react-uuid";
import TaskList from "./Components/TaskList";

const inputStyle = {
  caretColor: "transparent",
  border: "1px solid #3F444E",
  outline: "none",
  boxShadow: "none",
  backgroundColor: "transparent",
};

const App: React.FC = () => {
  // console.log(useTaskStore)

  const [tasks, createTask, updateTask, removeTask] = useTaskStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  React.useEffect(() => {
    createTask("123123");

    return () => {
      console.log(tasks);
    };
  }, []);

  const taskInput = useRef<HTMLInputElement>(null);

  const addTask = () => {
    if (taskInput.current) {
      let formValue = taskInput.current.value;
      createTask(formValue);
      taskInput.current.value = "";
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
        maxWidth={1400}
        display={"flex"}
        flexDirection={"column"}
        margin={"0 auto"}
      >
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Img
            src="/LOGO_CIRCLE.png"
            width={200}
            style={{ filter: "invert(0.5)" }}
          />
          <Button
            style={{ whiteSpace: "pre", position: "absolute", right: "0px" }}
            borderRadius={40}
            pt={7}
            pb={7}
            pl={2}
            pr={2}
            margin={0}
            color={"#46C8C1"}
            m={2}
            onClick={() => {
              addTask();
            }}
          >
            Add task{" "}
          </Button>
          <Button
            style={{ whiteSpace: "pre", position: "absolute", left: "0px" }}
            borderRadius={40}
            pt={7}
            pb={7}
            pl={2}
            pr={2}
            margin={0}
            color={"#46C8C1"}
            m={2}
            onClick={() => console.log(tasks)}
          >
            Delete all
          </Button>
        </Box>

        <Center alignItems={"center"} m={5} mt={0}>
          <Input
            textAlign={"center"}
            padding={7}
            fontSize={24}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            placeholder={"Your task..."}
            style={inputStyle}
            maxWidth={800}
            ref={taskInput}
          />
        </Center>
        <Accordion defaultIndex={[0]} allowMultiple m={5}>
          <AccordionItem
            background={"#46C8C1"}
            color={"#1A202C"}
            borderRadius={20}
          >
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Completed
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <List textAlign={"left"} spacing={3}>
                <>
                  {!tasks.length && <div>No tasks for today</div>}
                  {tasks.map((task) => (
                    <TaskList
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      onDone={removeTask}
                      onEdit={updateTask}
                      onRemove={removeTask}
                    />
                  ))}
                </>
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <ColorModeSwitcher />
      </Box>
    </ChakraProvider>
  );
};
export default App;
