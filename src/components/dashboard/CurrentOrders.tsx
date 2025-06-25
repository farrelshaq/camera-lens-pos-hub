
import { Clock } from "lucide-react";

const currentOrders = [
  {
    id: "ID1902",
    customer: "Michael Jordan",
    lastItem: "Canon EOS R5",
    items: 12,
    total: 290,
    progress: 100,
    status: "completed"
  },
  {
    id: "ID8591",
    customer: "Sujiwo Bejo",
    lastItem: "Sony FX3 Cinema Camera",
    items: 4,
    total: 180,
    progress: 79,
    status: "cooking"
  },
  {
    id: "ID7712",
    customer: "Dere Rizkani",
    lastItem: "Canon RF 24-70mm",
    items: 6,
    total: 190,
    progress: 60,
    status: "cooking"
  },
  {
    id: "ID8912",
    customer: "Filipus Seris",
    lastItem: "Tripod Manfrotto",
    items: 3,
    total: 50,
    progress: 40,
    status: "preparing"
  }
];

export const CurrentOrders = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Current Order</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentOrders.map((order) => (
            <div key={order.id} className="bg-gray-50 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{order.id}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'completed' ? 'bg-emerald-500' : 'bg-emerald-100'
                }`}>
                  {order.status === 'completed' ? (
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  ) : (
                    <Clock size={16} className="text-emerald-600" />
                  )}
                </div>
              </div>
              
              <h3 className="font-medium text-gray-800 mb-1">{order.customer}</h3>
              <p className="text-sm text-gray-500 mb-3">{order.lastItem}</p>
              
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-gray-600">{order.items} Items</span>
                <span className="font-semibold text-gray-800">${order.total}</span>
              </div>

              {/* Progress Ring */}
              <div className="absolute top-4 right-4">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray={`${order.progress}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">{order.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
