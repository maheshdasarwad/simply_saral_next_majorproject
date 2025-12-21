// List all schemes
// app/management/schemes/page.tsx
"use client";
// app/management/schemes/page.tsx - Add this import
import {
  Search,
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  IndianRupee,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText, // ADD THIS IMPORT
} from 'lucide-react';


interface Scheme {
  _id: string;
  title: string;
  shortName: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  keyInfo: {
    duration: string;
    amount: string;
  };
}

export default function SchemesListPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [schemeToDelete, setSchemeToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const isDark = theme === 'dark';
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSchemes();
  }, [currentPage, selectedCategory, selectedStatus]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      let url = `/api/schemes?page=${currentPage}&limit=${itemsPerPage}`;
      
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      if (selectedCategory !== 'All') url += `&category=${encodeURIComponent(selectedCategory)}`;
      if (selectedStatus !== 'All') url += `&status=${selectedStatus.toLowerCase()}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setSchemes(data.schemes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!schemeToDelete) return;
    
    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/schemes/${schemeToDelete}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setShowDeleteModal(false);
        setSchemeToDelete(null);
        fetchSchemes(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting scheme:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const categories = ['All', 'Education', 'Farmers', 'Women', 'Youth', 'Senior Citizens'];
  const statuses = ['All', 'Active', 'Inactive'];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Manage Schemes</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Create, edit, and manage all government schemes
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <button
            onClick={fetchSchemes}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <Link
            href="/management/schemes/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            New Scheme
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div
        className={`p-6 rounded-xl mb-6 shadow-lg ${
          isDark ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchSchemes()}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {schemes.length} schemes
          </p>
          <button
            onClick={fetchSchemes}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Schemes Table */}
      <div
        className={`rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading schemes...</p>
          </div>
        ) : schemes.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4" />
            <p className="mb-4">No schemes found</p>
            <Link
              href="/management/schemes/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4" />
              Create First Scheme
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`text-left ${
                      isDark ? 'bg-slate-900' : 'bg-gray-50'
                    }`}
                  >
                    <th className="p-4 font-medium">Scheme</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Duration</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Created</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((scheme) => (
                    <tr
                      key={scheme._id}
                      className={`border-t ${
                        isDark
                          ? 'border-slate-700 hover:bg-slate-750'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {scheme.imageUrl && (
                            <img
                              src={scheme.imageUrl}
                              alt={scheme.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium">{scheme.title}</p>
                            <p className="text-sm text-gray-500">
                              {scheme.shortName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            scheme.category === 'Education'
                              ? 'bg-blue-100 text-blue-800'
                              : scheme.category === 'Farmers'
                              ? 'bg-green-100 text-green-800'
                              : scheme.category === 'Women'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {scheme.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{scheme.keyInfo.duration}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-gray-400" />
                          <span>{scheme.keyInfo.amount}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {scheme.isActive ? (
                          <span className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-red-600">
                            <XCircle className="w-4 h-4" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm">
                        {new Date(scheme.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/schemes/${scheme._id}`}
                            className={`p-2 rounded-lg ${
                              isDark
                                ? 'bg-slate-700 hover:bg-slate-600'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/management/schemes/${scheme._id}`}
                            className={`p-2 rounded-lg ${
                              isDark
                                ? 'bg-slate-700 hover:bg-slate-600'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setSchemeToDelete(scheme._id);
                              setShowDeleteModal(true);
                            }}
                            className={`p-2 rounded-lg ${
                              isDark
                                ? 'bg-red-900/30 hover:bg-red-800/50'
                                : 'bg-red-50 hover:bg-red-100'
                            } text-red-600`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              className={`p-4 border-t ${
                isDark ? 'border-slate-700' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${
                      currentPage === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : isDark
                            ? 'hover:bg-slate-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-md rounded-xl p-6 shadow-xl ${
              isDark ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Delete Scheme</h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>
            
            <p className="mb-6">
              Are you sure you want to delete this scheme? All associated data will be permanently removed.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSchemeToDelete(null);
                }}
                className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete Scheme'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}