import { useState, useContext, useEffect } from "react";
import { Tr, Td, IconButton, Input, Spinner, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurger,
  faMoneyBillTransfer,
  faReceipt,
  faMobileScreen,
  faBeer,
  faShoppingCart,
  faPenToSquare,
  faTrash,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { UtilsContext } from "../../context/UtilsContext";
import { COLORS, BOX_SHADOWS} from "../../utils/constants.js"

/* TYPE TO ICON TRANSLATION */
const ICONS = {
  FOOD: faBurger,
  DRINKS: faBeer,
  CASUAL_SHOPPING: faShoppingCart,
  ONLINE_SHOPPING: faMobileScreen,
  FRIEND_TRANSFER: faMoneyBillTransfer,
  BILL: faReceipt,
};

const ExpenseItem = ({ expense, deleteExpense, fetchExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newConcept, setNewConcept] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newAmount, setNewAmount] = useState(null);

  /* INFO: request */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const utils = useContext(UtilsContext);

  useEffect(() => {
    //previous states
    setNewConcept(expense.concept);
    setNewDate(new Date(expense.date).toISOString().split("T")[0]);
    setNewAmount(expense.amount);
  }, []);

  const setEditingMode = () => {
    setIsEditing(true);
  };

  const updateExpense = (expenseId) => {
    setIsLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}updateExpense`, {
        concept: newConcept,
        id: expenseId,
        amount: newAmount,
        date: newDate,
        email: utils.email,
      })
      .then(() => {
        console.log("Expense updated succesfully");
        setIsLoading(false);
        fetchExpenses();
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoading(false);
      });
  };


  return !isEditing ? (
    <Tr bgColor={"boxBackground"}>
      <Td>
        <Box
          bgColor={COLORS[expense.type]}
          boxShadow={BOX_SHADOWS[expense.type]}
          w="35px"
          h="35px"
          borderRadius={"md"}
          pt="2"
        >
          <FontAwesomeIcon
            style={{
              width: "20px",
              height: "20px",
              margin: "0 auto",
            }}
            icon={ICONS[expense.type]}
          />
        </Box>
      </Td>
      <Td>{expense.concept}</Td>
      <Td>{new Date(expense.date).toLocaleDateString("es-ES")}</Td>
      <Td isNumeric>{expense.amount + "€"}</Td>
      <Td>
        <IconButton
          w="20px"
          h="20px"
          bgColor={"transparent"}
          _hover={{
            backgroundColor: "transparent",
            color: "#cf3862",
          }}
          _active={{ background: "transparent" }}
          color="#CC5476"
          onClick={setEditingMode}
        >
          <FontAwesomeIcon
            style={{
              width: "20px",
              height: "20px",
            }}
            icon={faPenToSquare}
          />
        </IconButton>

        <IconButton
          w="25px"
          h="25px"
          bgColor={"transparent"}
          _hover={{
            backgroundColor: "transparent",
            color: "#cf3862",
          }}
          _active={{ background: "transparent" }}
          color="#CC5476"
          onClick={() => deleteExpense(expense.id)}
        >
          <FontAwesomeIcon
            style={{
              width: "20px",
              height: "20px",
            }}
            icon={faTrash}
          />
        </IconButton>
      </Td>
    </Tr>
  ) : (
    /* INFO: EDITING MODE */
    <Tr bgColor={"boxBackground"} key={expense.id}>
      <Td>
        <Box
          bgColor={COLORS[expense.type]}
          boxShadow={BOX_SHADOWS[expense.type]}
          w="35px"
          h="35px"
          borderRadius={"md"}
          pt="2"
        >
          <FontAwesomeIcon
            style={{
              width: "20px",
              height: "20px",
              margin: "0 auto",
            }}
            icon={ICONS[expense.type]}
          />
        </Box>
      </Td>
      <Td>
        <Input
          value={newConcept}
          onChange={(e) => setNewConcept(e.target.value)}
          variant="flushed"
          type="text"
          maxLength={40}
        />
      </Td>
      <Td>
        <Input
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          w="120px"
          variant="flushed"
          type="date"
        />
      </Td>
      <Td isNumeric>
        <Input
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          w="50px"
          variant="flushed"
          type="number"
        />{" "}
      </Td>
      <Td>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <IconButton
              w="20px"
              h="20px"
              m="0.5"
              bgColor={"transparent"}
              _hover={{
                backgroundColor: "transparent",
                color: "green.700",
              }}
              _active={{ background: "transparent" }}
              color="green.500"
              onClick={() => updateExpense(expense.id)}
            >
              <FontAwesomeIcon
                style={{
                  width: "25px",
                  height: "25px",
                }}
                icon={faCheck}
              />
            </IconButton>
            <IconButton
              w="20px"
              h="20px"
              m="0.5"
              bgColor={"transparent"}
              _hover={{
                backgroundColor: "transparent",
                color: "#cf3862",
              }}
              _active={{ background: "transparent" }}
              color="#CC5476"
              onClick={() => setIsEditing(false)}
            >
              <FontAwesomeIcon
                style={{
                  width: "25px",
                  height: "25px",
                }}
                icon={faXmark}
              />
            </IconButton>
          </>
        )}
      </Td>
    </Tr>
  );
};

export default ExpenseItem;
