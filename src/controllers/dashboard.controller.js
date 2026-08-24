const User = require('../models/user.model.js');
const Payment = require('../models/payment.model.js');
const TripInquiry = require('../models/tripInquiry.model.js');
// Pending approval ke liye jo bhi model aap use kar rahe hain, use yaha import karein
const UserMembership = require('../models/userMembership.model.js'); 

exports.getDashboardData = async (req, res) => {
    try {
        // Frontend se year aayega query me (eg: ?year=2024). Agar nahi aaya toh current year le lenge.
        const year = parseInt(req.query.year) || new Date().getFullYear();

        // Saal ki starting aur ending date (For filtering chart data)
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

        // ==========================================
        // 1. STATS CARDS DATA (Total Counts)
        // ==========================================
        const totalUsersCount = await User.countDocuments({ role: 'user' }); // Sirf customers count karna
        
        // Assume kar rahe hain pending approvals membership model me 'pending' status se hain
        const pendingApprovalsCount = await User.countDocuments({ welcomeLetter: false }); 
        
        const totalInquiriesCount = await TripInquiry.countDocuments();
        
        // Total revenue of SUCCESSFUL payments
        const totalPaymentsResult = await Payment.aggregate([
            { $match: { status: 'SUCCESS' } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;


        // ==========================================
        // 2. CHART DATA (Month-wise Grouping for the selected year)
        // ==========================================
        
        // A. Payments Chart Data (Month-wise Total Amount)
        const monthlyPayments = await Payment.aggregate([
            { 
                $match: { 
                    createdAt: { $gte: startDate, $lte: endDate },
                    status: 'SUCCESS' // Sirf successful payments ka graph dikhayenge
                } 
            },
            { 
                $group: {
                    _id: { $month: "$createdAt" }, // 1 for Jan, 2 for Feb, etc.
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // B. Inquiries Chart Data (Month-wise Total Count)
        const monthlyInquiries = await TripInquiry.aggregate([
            { 
                $match: { 
                    createdAt: { $gte: startDate, $lte: endDate }
                } 
            },
            { 
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // ==========================================
        // 3. FORMAT DATA FOR APEX CHARTS (Array of 12 months)
        // ==========================================
        
        // Function to convert MongoDB group result into a 12-item array [Jan, Feb, ..., Dec]
        const formatMonthlyData = (data, valueKey) => {
            const months = new Array(12).fill(0); // [0,0,0,0,0,0,0,0,0,0,0,0]
            data.forEach(item => {
                const monthIndex = item._id - 1; // MongoDB returns month 1-12, array index is 0-11
                months[monthIndex] = item[valueKey];
            });
            return months;
        };

        const paymentChartSeries = formatMonthlyData(monthlyPayments, 'totalAmount');
        const inquiryChartSeries = formatMonthlyData(monthlyInquiries, 'count');

        // ==========================================
        // 4. SEND RESPONSE
        // ==========================================
        res.status(200).json({
            success: true,
            year: year,
            stats: {
                totalUsers: totalUsersCount,
                pendingApprovals: pendingApprovalsCount,
                totalInquiries: totalInquiriesCount,
                totalPayments: totalPaymentsAmount
            },
            charts: {
                payments: paymentChartSeries,
                inquiries: inquiryChartSeries
            }
        });

    } catch (error) {
        console.error("Dashboard Data Fetch Error:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch dashboard data' 
        });
    }
};