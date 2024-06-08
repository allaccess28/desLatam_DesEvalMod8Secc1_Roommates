import path from "path";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import { addRoomieQuery, getRoomatesQuery, addGastosQuery, getGastosQuery, updateGastosQuery, deleteGastosQuery, calcGastosQuery} from "../model/queries.js";
import {send} from "../helpers/sendmail.js";
const __dirname = path.resolve();
const apiUrl = "https://randomuser.me/api";


export const home = (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
}

export const addRoomie = async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        const data = response.data.results[0];
        const id = uuidv4().slice(0, 8);
        const newRommie = {
            id,
            nombre: `${data.name.first} ${data.name.last}`,
            email: data.email,
            debe: 0,
            recibe: 0,
            total: 0
        }
        const results = await addRoomieQuery(newRommie);
        calcGastosQuery();
        res.status(201).json(results);
    } catch (error) {
        console.log(error);
    }
}

export const getRoommates = async (req, res) => {
    try {
        const results = await getRoomatesQuery();
        
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
    }
}

export const addGasto = async (req, res) => {
    try {
        
      const newGasto = req.body;
      newGasto.id = uuidv4().slice(0, 8);
      const results = await addGastosQuery(newGasto);
      calcGastosQuery();
      send(newGasto.monto, newGasto.descripcion, newGasto.roommate);
      res.status(201).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const getGastos = async (req, res) => {
    try {
        const results = await getGastosQuery();
        res.send(results);
    } catch (error) {
        console.log(error);
    }
}

export const updateGasto = async (req, res) => {
    try{
        const {id}= req.query
        const {roommate, descripcion, monto} = req.body
        const newGasto = {
            id,
            roommate,
            descripcion,
            monto
        }
        const results = await updateGastosQuery(newGasto);
        calcGastosQuery();
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
    }
}

export const deleteGasto = async (req, res) => {
    try{
        const {id}= req.query
        const results = await deleteGastosQuery(id);
        calcGastosQuery();
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
    }
}

