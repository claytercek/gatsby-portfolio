---
title: building watchlist
date: 2019-03-21
category: case study
image: /assets/watchlist_featured.jpg
draft: false
---

## Watchlist is an iOS app allowing users to keep track of the movies and tv shows that they are interested in watching, with a sleek and intuitive UI.

The goal with this project was first and foremost to learn the Xcode programming
environment and swift language. Because of that, I pursued the idea of
Watchlist. I felt like a movie/tv watchlist app would allow me to learn a lot of
the important techniques and functionality that is required for developing for
iOS without getting too complicated for a ten week course, such as page segues,
persistent data storage, and external API integration.

Now while not an entirely unique idea, I felt that the way similar apps on the
app store had been executed always lacked something. Some lacked an intuitive
interface, some didn't have up to date search, some were far too
overcomplicated, and some just didn't look good. My goal was to create a simple
interface that was easy to understand and operate, while still having the
important functionality one would expect from an app like this.

---

# Visual Design

The first phase of creating this app was imagining the interface. With one of my
main design goals being simplicity, I wanted to minimize the amount of different
views and pages that were possible within the app. Therefor I designed the
search page to be almost identical to the home page, though with the addition of
a search bar at the top.

## First iteration

My original idea was to have items in a standard list, with the poster image on
the left, and title and description on the right. All interactions, both on the
home page and the search page, would be accessible simply through swiping the
items to the left or right, similar to how the mail app on iOS operates.

I took this 'prototype' and showed it to a couple people to gather some input.
The general feedback said that I might have made it a little too simple. People
wanted more information than just a description and title. With that I went back
to the drawing board.

![v1 screens](/assets/watchlist_v1.jpg)

## Second iteration

Because my quick user testing showed that users would like a bit more info, I
figured it might be better to have a detail screen instead of all the movie info
being visible from the list view. I decided to strip most of the information
from the list view, so that its just a poster image (or a title if no poster can
be found). This also allowed for a lot more items to visible at first glance,
because now instead of one item stretching the full width of the container, we
can fit three on a line.

The detail view is pretty simple, just showing the title, description, and
poster image along with a few extra details like runtime, genres and original
air date.

One of the advantages of developing within the apple ecosystem is that it is
really easy to create beautiful designs that look like they came straight from
HQ. I decided to capitalize on this, shifting from my original design to
something a lot cleaner and sleeker. This meant no more colorful gradient
backgrounds, rounded corners, and Helvetica everywhere.

![v2 screens](/assets/watchlist_v2.jpg)

---

# Development

Getting used to developing within the Xcode environment was pretty tough,
because I'm used to having full control over the product I'm creating
programmatically, and I like having the option to work in any editor or from the
command line. That said, after a couple weeks working with it I started to
understand some of the benefits.

## Constraint Gripes

The one thing that I still am not a fan of after ten weeks of using it is the
constraint and positioning system. Dropping items in from the library and
dragging them around just reminds me too much of the dreaded wysiwyg editor.
Coming from web development, I'me used to breaking my objects down into smaller
and smaller boxes for positioning. I feel like the constraints system is more
hassle than its worth, and there are too many opportunities for something to
display incorrectly.

## API Integration

Obviously I didn't have the time or resources to create my own database of all
movies and tv shows, so the next best thing was accessing a third party API. I
looked around for a while to find an API that had all of the information I
wanted, and I landed on
[themoviedb](https://www.themoviedb.org/documentation/api). Their API gives me
access to all of the search functionality and information for movies and tv
shows that I wanted, all for a total cost of **\$0**. I originally wanted to
also include where the user could stream/buy a given item, but no free APIs
offered such functionality.

For implementing the API, I used
[AlamoFire](https://github.com/Alamofire/Alamofire), a third party framework. I
decided to use it because Swift's suggested way for making api calls with just
native code seemed a lot more complicated, and AlamoFire seemed to be industry
standard.

<!-- Here's an example of an api request using AlamoFire:

```swift
AF.request("https://api.mywebserver.com/v1/board", method: .get, parameters: ["title": "New York Highlights"])
    .validate(statusCode: 200..<300)
    .responseDecodable { (response: DataResponse) in
        switch response.result {
        case .success(let board):
            print("Created board title is \(board.title)") // New York Highlights
        case .failure(let error):
            print("Board creation failed with error: \(error.localizedDescription)")
        }
}
```

And here's the same request using swifts vanilla URLSession:

```swift
enum Error: Swift.Error {
    case requestFailed
}

// Build up the URL
var components = URLComponents(string: "https://api.mywebserver.com/v1/board")!
components.queryItems = ["title": "New York Highlights"].map { (key, value) in
    URLQueryItem(name: key, value: value)
}

// Generate and execute the request
let request = try! URLRequest(url: components.url!, method: .get)
URLSession.shared.dataTask(with: request) { (data, response, error) in
    do {
        guard let data = data,
            let response = response as? HTTPURLResponse, (200 ..< 300) ~= response.statusCode,
            error == nil else {
            // Data was nil, validation failed or an error occurred.
            throw error ?? Error.requestFailed
        }
        let board = try JSONDecoder().decode(Board.self, from: data)
        print("Created board title is \(board.title)") // New York Highlights
    } catch {
        print("Board creation failed with error: \(error.localizedDescription)")
    }
}
```

Suffice to say AlamoFire really makes requests a lot less complicated. -->

---

# Final Product

![v3 screens](/assets/watchlist_v3.jpg)

All of this design and development resulted in Watchlist, the native app for
iOS! It has a very simple and intuitive structure, with three pages:

- Home – where the user can view their current watchlist
- Detail – where a user can view details about the selected item
- Search – where the user can find new items to add to their list

You can search for tv shows and movies to add to their watchlist, and click on
them to learn more info. Once you finish an item or decide you don't want to
watch it anymore, you just have to press the delete button on the details page.

# Next Steps

There are a handful of features that I am hoping to add to the app in the
future:

- Reordering items on the home screen
- Finding data for where to watch a given item
- More interesting segues and animations
- Search filtering by genre or type
