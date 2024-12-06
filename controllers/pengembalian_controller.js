import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getAllPengembalian = async(req, res) => {
    try {
        const result = await prisma.pengembalian.findMany()
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.json ({
            msg: error
        })        
    }
    
}

export const getPengembalianById = async(req, res) => {
    try {
        const result = await prisma.pengembalian.findUnique({
            where:{
                id_borrow: Number(req.params.id)
            }
        })
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.json ({
            msg: error
        })        
    }
    
}

export const addPengembalian = async (req, res) => {
    try {
        const { id_borrow, id_barang, tgl_kembali } = req.body;

        const result = await prisma.pengembalian.create({
            data: {
                id_borrow: id_borrow, // Pastikan kolom ini ada
                id_barang: id_barang,
                tgl_kembali: new Date(tgl_kembali)
            }
        });

        res.json({
            success: true,
            msg: "Pengembalian berhasil dicatat",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message || "Error saat mencatat pengembalian"
        })
    }
}

export const updatePengembalian = async(req, res) => {
    try {
        const {id_barang, tgl_kembali} = req.body
        const result = await prisma.pengembalian.update({
            where:{
                id_barang: Number(req.params.id)
            },
            data:{
                id_barang: id_barang,
                tgl_kembali: tgl_kembali
            }
        })
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.json ({
            msg: error
        })        
    }
    
}

export const deletePengembalian = async(req, res) => {
    try {
        const result = await prisma.pengembalian.delete({
            where:{
                id_barang: Number(req.params.id)
            }
        })
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error);
        res.json ({
            msg: error
        })        
    }
    
}