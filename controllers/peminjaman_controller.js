import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getAllPeminjaman = async(req, res) => {
    try {
        const result = await prisma.peminjaman.findMany()
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

export const getPeminjamanById = async(req, res) => {
    try {
        const result = await prisma.peminjaman.findUnique({
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

import { v4 as uuidv4 } from 'uuid';

export const addPeminjaman = async (req, res) => {
    try {
        const { id_user, id_barang, tgl_pinjam, tgl_kembali, qty } = req.body;

        // Konversi tgl_pinjam dan tgl_kembali ke objek Date
        const parsedTglPinjam = new Date(tgl_pinjam);
        const parsedTglKembali = new Date(tgl_kembali);

        // Validasi format tanggal
        if (isNaN(parsedTglPinjam.getTime()) || isNaN(parsedTglKembali.getTime())) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid date format for tgl_pinjam or tgl_kembali. Use ISO 8601 format (YYYY-MM-DD).'
            });
        }

        const id_borrow = uuidv4(); // Generate unique id for id_borrow

        const result = await prisma.peminjaman.create({
            data: {
                id_borrow: id_borrow,
                id_user: id_user,
                qty : qty,
                id_barang: id_barang,
                tgl_pinjam: parsedTglPinjam,
                tgl_kembali: parsedTglKembali
            }
        });

        res.json({
            success: true,
            msg:"pemminjaman berhasil dicatat",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}




export const updatePeminjaman = async (req, res) => {
    try {
        const { id_borrow, tgl_kembali } = req.body;

       
        const updatedPeminjaman = await prisma.peminjaman.update({
            where: { id_borrow },
            data: { tgl_kembali: new Date(tgl_kembali) },
            include: { item: true, user: true }
        });

        res.status(200).json({
            status: "success",
            message: "Pengembalian berhasil dicatat",
            data: {
                borrow_id: updatedPeminjaman.id_borrow,
                item_id: updatedPeminjaman.id_barang,
                user_id: updatedPeminjaman.id_user,
                actual_return_date: updatedPeminjaman.tgl_kembali.toISOString().split('T')[0] // Format tanggal
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message || "An unexpected error occurred"
        })
    }
}

    


export const deletePeminjaman = async(req, res) => {
    try {
        const result = await prisma.peminjaman.delete({
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









//nmr 4 awal
export const getUsageAnalysis = async (req, res) => {
    const { tgl_pinjam, tgl_kembali, group_by } = req.body;
  
    // Validasi input
    if (!tgl_pinjam || !tgl_kembali || !group_by) {
      return res.status(400).json({
        status: "error",
        message: "tgl_pinjam, tgl_kembali, and group_by are required",
      });
    }
  
    try {
      // filter berdasarkan tanggal
      const borrowData = await prisma.peminjaman.findMany({
        where: {
            tgl_pinjam: {
                gte: new Date(tgl_pinjam),
            },
            tgl_kembali: {
                lte: new Date(tgl_kembali),
            },
        },
        include: {
            barang: true,
            user: true,
        },
    });
    
  
      // Debug log untuk memeriksa data
      console.log("Borrow Data:", borrowData);
  
      // data berdasarkan group_by
      const groupedData = borrowData.reduce((acc, record) => {
        let groupKey;
        if (group_by === "user") {
          groupKey = record.user ? record.user.name : "Unknown User";
        } else if (group_by === "item") {
          groupKey = record.barang ? record.barang.name : "Unknown Item";
        } else if (group_by === "category") {
          groupKey = record.barang ? record.barang.category : "Unknown Category";
        } else if (group_by === "location") {
          groupKey = record.barang ? record.barang.location : "Unknown Location";
        } else {
          throw new Error("Invalid group_by value");
        }
  
        if (!acc[groupKey]) {
          acc[groupKey] = {
            group: groupKey,
            total_borrowed: 0,
            total_returned: 0,
            items_in_use: 0,
          };
        }
  
        acc[groupKey].total_borrowed += record.qty;
        acc[groupKey].total_returned += record.status === "kembali" ? record.qty : 0;
        acc[groupKey].items_in_use += record.status === "dipinjam" ? record.qty : 0;
  
        return acc;
      }, {});
  
      //  respons
      const usageAnalysis = Object.values(groupedData);
  
      res.status(200).json({
        status: "success",
        data: {
          analysis_periode: {
            tgl_pinjam,
            tgl_kembali,
          },
          usage_analysis: usageAnalysis,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  };
  
  export const analyzeItems = async (req, res) => {
    const { tgl_pinjam, tgl_kembali, qty } = req.body;
  
    // validasi
    if (!tgl_pinjam || !tgl_kembali || !qty) {
      return res.status(400).json({
        status: "error",
        message: "tgl_pinjam and tgl_kembali are required",
      });
    }
  
    try {
      // Query untuk barang yang paling sering dipinjam
      const frequentlyBorrowed = await prisma.peminjaman.groupBy({
        by: ['id_barang'],
        where: {
          tgl_pinjam: {
            gte: new Date(tgl_pinjam),
          },
          tgl_kembali: {
            lte: new Date(tgl_kembali),
          },
        },
        select: {
          _sum: {
            qty: true,
          },
          id_barang: true,
        },
        orderBy: {
          _sum: {
            qty: 'desc',
          },
        },
        take: 10,
      });
      
  
      // detail barang
      const frequentlyBorrowedItems = await Promise.all(
        frequentlyBorrowed.map(async (item) => {
          const barang = await prisma.barang.findUnique({
            where: { id_barang: item.id_barang },
          });
          return {
            item_id: item.id_barang,
            name: barang.name,
            category: barang.category,
            total_borrowed: item._sum.qty,
          };
        })
      );
  
      // barang dengan pengembalian terlambat
      const inefficientItemsData = await prisma.peminjaman.findMany({
        where: {
          borrow_date: {
            gte: new Date(tgl_pinjam),
          },
          return_date: {
            lte: new Date(tgl_kembali),
          },
          status: 'kembali',
        },
      });
  
      const inefficientItems = await Promise.all(
        inefficientItemsData.reduce((acc, item) => {
          const lateReturn = new Date(item.return_date) > new Date(item.borrow_date);
          if (lateReturn) {
            const existing = acc.find((i) => i.id_barang === item.id_barang);
            if (existing) {
              existing.total_late_returns += 1;
            } else {
              acc.push({
                item_id: item.id_barang,
                total_late_returns: 1,
              });
            }
          }
          return acc;
        }, [])
        .map(async (item) => {
          const barang = await prisma.barang.findUnique({
            where: { id_barang: item.item_id },
          });
          return {
            item_id: item.item_id,
            name: barang.name,
            category: barang.category,
            total_late_returns: item.total_late_returns,
          };
        })
      );
  
      // respon
      res.status(200).json({
        status: "success",
        data: {
          analysis_period: {
            tgl_pinjam,
            tgl_kembali,
          },
          frequently_borrowed_items: frequentlyBorrowedItems,
          inefficient_items: inefficientItems,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  };