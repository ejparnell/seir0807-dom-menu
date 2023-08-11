// Menu data structure (Task 5.0)
const menuLinks = [
	{ text: 'about', href: '/about' },
	{
		text: 'catalog',
		href: '#',
		subLinks: [
			{ text: 'all', href: '/catalog/all' },
			{ text: 'top selling', href: '/catalog/top' },
			{ text: 'search', href: '/catalog/search' },
		],
	},
	{
		text: 'orders',
		href: '#',
		subLinks: [
			{ text: 'new', href: '/orders/new' },
			{ text: 'pending', href: '/orders/pending' },
			{ text: 'history', href: '/orders/history' },
		],
	},
	{
		text: 'account',
		href: '#',
		subLinks: [
			{ text: 'profile', href: '/account/profile' },
			{ text: 'sign out', href: '/account/signout' },
		],
	},
]

// Task 1.0
// grab the main element from the DOM
const mainEl = document.querySelector('main')

// Task 1.1
// change the main elements background color to be the main background color using css variables
mainEl.style.backgroundColor = 'var(--main-bg)'

// Task 1.2
// Adding an h1 to the main element
mainEl.innerHTML = '<h1>SEI Rocks!</h1>'

// Task 1.3
// Adding the class of `flex-ctr` to the main element
// classList is needed because there could be multiple classes on this element, we don't want to save over all of them just add to the list that might be there
mainEl.classList.add('flex-ctr')

// Task 2.0
// Get the element that has the id of top-menu
const topMenuEl = document.getElementById('top-menu')

// Task 2.1
// Setting the height of the element to be 100%
topMenuEl.style.height = '100%'

// Task 2.2
// change the top menu elements background color to be the top menu background color using css variables
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'

// Task 2.3
// Adding the class of `flex-around` to the top menu element
// classList is needed because there could be multiple classes on this element, we don't want to save over all of them just add to the list that might be there
topMenuEl.classList.add('flex-around')

// Task 3.0
// menuLinks data structure copied at the top

// Task 3.1
menuLinks.forEach(function (link) {
	// for each menu link we want to create an `a` element
	const linkEl = document.createElement('a')
	// set the newly created `a` elements href attribute to be the link we are iterating over
	// our `a` element would look like <a href="/about"></a>
	linkEl.setAttribute('href', link.href)
	// set the newly created `a` elements inner text contents to what we are iterating over
	// our `a` element would look like <a href="/about">about</a>
	linkEl.textContent = link.text
    // take our newly created element and add it to the top menu element
    // if we don't add our element to the DOM we will not be able to see them. Always .appendChild(element) when you have created on in js
	topMenuEl.appendChild(linkEl)
})

// Task 4.0
// get the element with the id of sub-menu
const subMenuEl = document.getElementById('sub-menu')

// Task 4.1
// set the sub menus height to 100%
subMenuEl.style.height = '100%'

// Task 4.2
// set the background color of the sub menu using css variables
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'

// Task 4.3
// Adding the class of `flex-around` to the sub menu element
// classList is needed because there could be multiple classes on this element, we don't want to save over all of them just add to the list that might be there
subMenuEl.classList.add('flex-around')

// Task 4.4
// give the sub menu element an absolute position
subMenuEl.style.position = 'absolute'

// Task 4.5
// put the sub menu at the top of the page
subMenuEl.style.top = '0'

// Task 5.0
// menuLinks array updated at the top

// Task 5.1
// selecting all of the top menus `a` elements
const topMenuLinks = document.querySelectorAll('#top-menu a')
// saving a boolean to a show variable. If false the sub menu will not show and true it will
let showingSubMenu = false

// Task 5.2
topMenuEl.addEventListener('click', function (evt) {
    // prevents the default actions our browser take
    // normally used for preventing the refreshing of a page when you submit a form
    // is not needed here
	evt.preventDefault()
    // we target what we clicked on
    // if we clicked on ABOUT then the `a` element for about would be the target and saved in the variable link
	const link = evt.target
    // guards - making sure that we are only handling clicks on those `a` elements in the top menu
	if (link.tagName !== 'A') return
	console.log(link.textContent)
	// Task 5.3
    // using the class list again. Since there can be multiple classes on a element we can use the class list to  see what is there. We are checking here is there is a class called `active` on this link
	if (link.classList.contains('active')) {
        // if there is an `active` class remove it
		link.classList.remove('active')
        // set the sub menu to show
		showingSubMenu = false
        // set the top of the sub menu to 0
		subMenuEl.style.top = '0'
        // we are done with the task so exit
		return
	}
	// Task 5.4
	topMenuLinks.forEach(function (link) {
        // for every link in the top menu remove the class `active`
		link.classList.remove('active')
	})
	// Task 5.5
    // add `active` class back to the currently clicked link
	link.classList.add('active')
	// Task 5.6
    // .find will iterate through an array and return the first item matching the condition we are checking for
	const linkData = menuLinks.find(function (linkObj) {
        // if the link objects text strictly equals the text content return it
		return linkObj.text === link.textContent
	})
    // if the linkData variable we just got has a `subLinks` key we should show the sub menu
	showingSubMenu = 'subLinks' in linkData
	// Task 6.4
	// Task 5.7
    // if the above is true
	if (showingSubMenu) {
        // build the sub menu with the sub links from our currently clicked item
		buildSubMenu(linkData.subLinks)
		subMenuEl.style.top = '100%'
	} else {
        // else it's the about with no sub menu
		subMenuEl.style.top = '0'
		mainEl.innerHTML = '<h1>about</h1>'
	}
})

// Task 5.8
function buildSubMenu(subLinks) {
    // clear out the HTML that might be left over from other sub menus
	subMenuEl.innerHTML = ''
    // for every sub link
	subLinks.forEach(function (link) {
		// create an `a` element for every sub link
		const linkEl = document.createElement('a')
		// set the newly created `a` elements href attribute to be the link we are iterating over
		// our `a` element would look like <a href="/catalog/all"></a>
		linkEl.setAttribute('href', link.href)
		// set the newly created `a` elements inner text contents to what we are iterating over
		// our `a` element would look like <a href="/catalog/all">all</a>
		linkEl.textContent = link.text
		// take our newly created element and add it to the sub menu element
		// if we don't add our element to the DOM we will not be able to see them. Always .appendChild(element) when you have created on in js
		subMenuEl.appendChild(linkEl)
	})
}

// Task 6.0
// listening for a click on a sub menu item
subMenuEl.addEventListener('click', function (evt) {
    // prevents default functionally
    // again if you are not submitting a form you really don't need this
	evt.preventDefault()
    // getting the link we clicked on
	const link = evt.target
    // making sure that link is an `a` element. If not we need to return
	if (link.tagName !== 'A') return
	console.log(link.textContent)
	// Task 6.1
    // showing the sub menu is false to start
	showingSubMenu = false
	subMenuEl.style.top = '0'
	// Task 6.2
	topMenuLinks.forEach(function (link) {
        // removing the `active` class from the link we just clicked
		link.classList.remove('active')
	})
	// Task 6.3
    // changing the main elements text content to the link text content
	mainEl.innerHTML = `<h1>${link.textContent}</h1>`
})
