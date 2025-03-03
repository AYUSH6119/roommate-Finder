Reviews Section
                <div class="py-4 px-4 w-full h-auto max-w-2xl bg-white bg-opacity-90 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-10 mb-16 max-h-full">
               <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Reviews</h3>

               
                <div class="mt-6 space-y-8">
                 <!-- Review by Aman Gupta with 5-star rating -->
                  <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
               <p class="text-lg font-medium text-gray-900 dark:text-white ">Aman Gupta</p>
                <div class="flex items-center mt-1 text-3xl">
                 <!-- Display 5 filled stars for a 5-star rating -->
                 <span class="text-yellow-500">&#9733;</span> <!-- Filled star -->
                 <span class="text-yellow-500">&#9733;</span> <!-- Filled star -->
                 <span class="text-yellow-500">&#9733;</span> <!-- Filled star -->
                 <span class="text-yellow-500">&#9733;</span> <!-- Filled star -->
                 <span class="text-yellow-500">&#9733;</span> <!-- Filled star -->

               </div>
                <p class="text-gray-500 dark:text-gray-400 text-base mt-3">Good to see you</p>
             </div>

                 <!-- Review by Aman Gupta with 5-star rating -->
                  <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <% for(review of user.reviews) { %>
               <p class="text-lg font-medium text-gray-900 dark:text-white ">Aman Gupta</p>
                <div class="flex items-center mt-1 text-3xl">
                 <!-- Display 5 filled stars for a 5-star rating -->
                 <% for (let i = 1; i <= 5; i++) { %>
                    <% if (i <= review.rating) { %>
                      <span class="text-yellow-500">&#9733;</span> <!-- Filled star -->
                    <% } else { %>
                      <span class="text-gray-300">&#9734;</span> <!-- Empty star -->
                    <% } %>
                  <% } %>
               </div>
                <p class="text-gray-500 dark:text-gray-400 text-base mt-3"><%= review.comment %></p>
               
             </div>
             <%}%>

            </div>