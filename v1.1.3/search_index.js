var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "1. Introduction",
    "title": "1. Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "#**1.**-Introduction-1",
    "page": "1. Introduction",
    "title": "1. Introduction",
    "category": "section",
    "text": "Welcome to the documentation for Pkg, Julia\'s package manager. The documentation covers many things, for example managing package installations, developing packages, working with package registries and more.Throughout the manual the REPL interface to Pkg is used in the examples. There is also a functional API interface, which is preferred when not working interactively. This API is documented in the API Reference section."
},

{
    "location": "#Background-and-Design-1",
    "page": "1. Introduction",
    "title": "Background and Design",
    "category": "section",
    "text": "Pkg is a complete rewrite of Julia\'s old package manager[1] and was released together with Julia v1.0. Unlike traditional package managers, which install and manage a single global set of packages, Pkg is designed around “environments”: independent sets of packages that can be local to an individual project or shared and selected by name. The exact set of packages and versions in an environment is captured in a manifest file which can be checked into a project repository and tracked in version control, significantly improving reproducibility of projects. If you’ve ever tried to run code you haven’t used in a while only to find that you can’t get anything to work because you’ve updated or uninstalled some of the packages your project was using, you’ll understand the motivation for this approach. In Pkg, since each project maintains its own independent set of package versions, you’ll never have this problem again. Moreover, if you check out a project on a new system, you can simply materialize the environment described by its manifest file and immediately be up and running with a known-good set of dependencies.Since environments are managed and updated independently from each other, “dependency hell” is significantly alleviated in Pkg. If you want to use the latest and greatest version of some package in a new project but you’re stuck on an older version in a different project, that’s no problem – since they have separate environments they can just use different versions, which are both installed at the same time in different locations on your system. The location of each package version is canonical, so when environments use the same versions of packages, they can share installations, avoiding unnecessary duplication of the package. Old package versions that are no longer used by any environments are periodically “garbage collected” by the package manager.Pkg’s approach to local environments may be familiar to people who have used Python’s virtualenv or Ruby’s bundler. In Julia, instead of hacking the language’s code loading mechanisms to support environments, we have the benefit that Julia natively understands them. In addition, Julia environments are “stackable”: you can overlay one environment with another and thereby have access to additional packages outside of the primary environment. This makes it easy to work on a project, which provides the primary environment, while still having access to all your usual dev tools like profilers, debuggers, and so on, just by having an environment including these dev tools later in the load path.Last but not least, Pkg is designed to support federated package registries. This means that it allows multiple registries managed by different parties to interact seamlessly. In particular, this includes private registries which can live behind corporate firewalls. You can install and update your own packages from a private registry with exactly the same tools and workflows that you use to install and manage official Julia packages. If you urgently need to apply a hotfix for a public package that’s critical to your company’s product, you can tag a private version of it in your company’s internal registry and get a fix to your developers and ops teams quickly and easily without having to wait for an upstream patch to be accepted and published. Once an official fix is published, however, you can just upgrade your dependencies and you\'ll be back on an official release again.[1]: Often denoted Pkg2, now archived as OldPkg at   github.com/JuliaAttic/OldPkg.jl."
},

{
    "location": "getting-started/#",
    "page": "2. Getting Started",
    "title": "2. Getting Started",
    "category": "page",
    "text": ""
},

{
    "location": "getting-started/#**2.**-Getting-Started-1",
    "page": "2. Getting Started",
    "title": "2. Getting Started",
    "category": "section",
    "text": "Pkg comes with its own REPL mode, which can be entered from the Julia REPL by pressing ]. To get back to the Julia REPL press backspace or ^C.(v1.1) pkg>The prompt displays the current active environment, which is the environment that Pkg commands will modify. The default environment is based on the current Julia version, (v1.1) in the example above, and is located in ~/.julia/environments/.note: Note\nThere are other ways of interacting with Pkg:The pkg string macro, which is available after using Pkg. The command pkg\"cmd\" is equivalent to executing cmd in the Pkg REPL.\nThe API-mode, which is recommended for non-interactive environments. The API mode is documented in full in the API Reference section of the Pkg documentation.To add a package, use the add command(v1.1) pkg> add ExampleMultiple packages may be specified:(v1.1) pkg> add Example JSON StaticArraysTo remove a package, use the rm command. rm also accepts multiple packages:(v1.1) pkg> rm JSON StaticArraysSo far, we have specified by names in a registry. If you want to add a package which is not in a registry, you can specify the location directly, for example with an URL:(v1.1) pkg> add https://github.com/JuliaLang/Example.jlTo remove this package, use rm and specify the package by name (not URL!):(v1.1) pkg> rm ExampleThe update command can be used to update a installed package:(v1.1) pkg> update ExampleTo update all installed packages simply use update without any arguments:(v1.1) pkg> updateThis should cover most use cases for simple package management: adding, updating and removing dependencies. But say you are working on a project and you encounter a bug in one of your dependencies! How would you access the source? Pkg can help you out with develop:(v1.1) pkg> develop --local ExampleThe Example package is now cloned to the dev subdirectory of your project directory. You can edit Example\'s source and any changes you make will be visible to your project.Once upstream Example has been patched, you can stop tracking the local clone. Do this with a free command:(v1.1) pkg> free ExampleNow you are back to using the version of Example in the registry.If you are ever stuck, ask Pkg for help:(v1.1) pkg> ?You should see a list of available commands along with short descriptions. You can ask for more thorough help for a specific command:(v1.1) pkg> ?developThis quickstart should get you started with Pkg\'s common use cases, but there is still lots more that Pkg has to offer in terms of powerful package management. Read the full manual to learn more!"
},

{
    "location": "managing-packages/#",
    "page": "3. Managing Packages",
    "title": "3. Managing Packages",
    "category": "page",
    "text": ""
},

{
    "location": "managing-packages/#**3.**-Managing-Packages-1",
    "page": "3. Managing Packages",
    "title": "3. Managing Packages",
    "category": "section",
    "text": ""
},

{
    "location": "managing-packages/#Adding-packages-1",
    "page": "3. Managing Packages",
    "title": "Adding packages",
    "category": "section",
    "text": "There are two ways of adding packages, either using the add command or the dev command. The most frequently used one is add and its usage is described first."
},

{
    "location": "managing-packages/#Adding-registered-packages-1",
    "page": "3. Managing Packages",
    "title": "Adding registered packages",
    "category": "section",
    "text": "In the Pkg REPL packages can be added with the add command followed by the name of the package, for example:(v1.0) pkg> add Example\n   Cloning default registries into /Users/kristoffer/.julia/registries\n   Cloning registry General from \"https://github.com/JuliaRegistries/General.git\"\n  Updating registry at `~/.julia/registries/General`\n  Updating git-repo `https://github.com/JuliaRegistries/General.git`\n Resolving package versions...\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [7876af07] + Example v0.5.1\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [7876af07] + Example v0.5.1\n  [8dfed614] + TestHere we added the package Example to the current project. In this example, we are using a fresh Julia installation, and this is our first time adding a package using Pkg. By default, Pkg clones Julia\'s General registry, and uses this registry to look up packages requested for inclusion in the current environment. The status update shows a short form of the package UUID to the left, then the package name, and the version. Since standard libraries (e.g. Test) are shipped with Julia, they do not have a version. The project status contains the packages you have added yourself, in this case, Example:(v1.0) pkg> st\n    Status `Project.toml`\n  [7876af07] Example v0.5.1The manifest status, in addition, includes the dependencies of explicitly added packages.(v1.0) pkg> st --manifest\n    Status `Manifest.toml`\n  [7876af07] Example v0.5.1\n  [8dfed614] TestIt is possible to add multiple packages in one command as pkg> add A B C.After a package is added to the project, it can be loaded in Julia:julia> using Example\n\njulia> Example.hello(\"User\")\n\"Hello, User\"A specific version can be installed by appending a version after a @ symbol, e.g. @v0.4, to the package name:(v1.0) pkg> add Example@0.4\n Resolving package versions...\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [7876af07] + Example v0.4.1\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [7876af07] + Example v0.4.1If the master branch (or a certain commit SHA) of Example has a hotfix that has not yet included in a registered version, we can explicitly track a branch (or commit) by appending #branch (or #commit) to the package name:(v1.0) pkg> add Example#master\n  Updating git-repo `https://github.com/JuliaLang/Example.jl.git`\n Resolving package versions...\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [7876af07] ~ Example v0.5.1 ⇒ v0.5.1+ #master (https://github.com/JuliaLang/Example.jl.git)\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [7876af07] ~ Example v0.5.1 ⇒ v0.5.1+ #master (https://github.com/JuliaLang/Example.jl.git)The status output now shows that we are tracking the master branch of Example. When updating packages, we will pull updates from that branch.To go back to tracking the registry version of Example, the command free is used:(v1.0) pkg> free Example\n Resolving package versions...\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [7876af07] ~ Example v0.5.1+ #master (https://github.com/JuliaLang/Example.jl.git) ⇒ v0.5.1\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [7876af07] ~ Example v0.5.1+ #master )https://github.com/JuliaLang/Example.jl.git) ⇒ v0.5.1"
},

{
    "location": "managing-packages/#Adding-unregistered-packages-1",
    "page": "3. Managing Packages",
    "title": "Adding unregistered packages",
    "category": "section",
    "text": "If a package is not in a registry, it can still be added by instead of the package name giving the URL to the repository to add.(v1.0) pkg> add https://github.com/fredrikekre/ImportMacros.jl\n  Updating git-repo `https://github.com/fredrikekre/ImportMacros.jl`\n Resolving package versions...\nDownloaded MacroTools ─ v0.4.1\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [e6797606] + ImportMacros v0.0.0 # (https://github.com/fredrikekre/ImportMacros.jl)\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [e6797606] + ImportMacros v0.0.0 # (https://github.com/fredrikekre/ImportMacros.jl)\n  [1914dd2f] + MacroTools v0.4.1The dependencies of the unregistered package (here MacroTools) got installed. For unregistered packages we could have given a branch (or commit SHA) to track using #, just like for registered packages."
},

{
    "location": "managing-packages/#Adding-a-local-package-1",
    "page": "3. Managing Packages",
    "title": "Adding a local package",
    "category": "section",
    "text": "Instead of giving a URL of a git repo to add we could instead have given a local path to a git repo. This works similarly to adding a URL. The local repository will be tracked (at some branch) and updates from that local repo are pulled when packages are updated. Note that changes to files in the local package repository will not immediately be reflected when loading that package. The changes would have to be committed and the packages updated in order to pull in the changes."
},

{
    "location": "managing-packages/#Developing-packages-1",
    "page": "3. Managing Packages",
    "title": "Developing packages",
    "category": "section",
    "text": "By only using add your Manifest will always have a \"reproducible state\", in other words, as long as the repositories and registries used are still accessible it is possible to retrieve the exact state of all the dependencies in the project. This has the advantage that you can send your project (Project.toml and Manifest.toml) to someone else and they can \"instantiate\" that project in the same state as you had it locally. However, when you are developing a package, it is more convenient to load packages at their current state at some path. For this reason, the dev command exists.Let\'s try to dev a registered package:(v1.0) pkg> dev Example\n  Updating git-repo `https://github.com/JuliaLang/Example.jl.git`\n Resolving package versions...\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [7876af07] + Example v0.5.1+ [`~/.julia/dev/Example`]\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [7876af07] + Example v0.5.1+ [`~/.julia/dev/Example`]The dev command fetches a full clone of the package to ~/.julia/dev/ (the path can be changed by setting the environment variable JULIA_PKG_DEVDIR). When importing Example julia will now import it from ~/.julia/dev/Example and whatever local changes have been made to the files in that path are consequently reflected in the code loaded. When we used add we said that we tracked the package repository, we here say that we track the path itself. Note that the package manager will never touch any of the files at a tracked path. It is therefore up to you to pull updates, change branches etc. If we try to dev a package at some branch that already exists at ~/.julia/dev/ the package manager we will simply use the existing path. For example:(v1.0) pkg> dev Example\n  Updating git-repo `https://github.com/JuliaLang/Example.jl.git`\n[ Info: Path `/Users/kristoffer/.julia/dev/Example` exists and looks like the correct package, using existing path instead of cloningNote the info message saying that it is using the existing path. As a general rule, the package manager will never touch files that are tracking a path.If dev is used on a local path, that path to that package is recorded and used when loading that package. The path will be recorded relative to the project file, unless it is given as an absolute path.To stop tracking a path and use the registered version again, use free(v1.0) pkg> free Example\n Resolving package versions...\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [7876af07] ↓ Example v0.5.1+ [`~/.julia/dev/Example`] ⇒ v0.5.1\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [7876af07] ↓ Example v0.5.1+ [`~/.julia/dev/Example`] ⇒ v0.5.1It should be pointed out that by using dev your project is now inherently stateful. Its state depends on the current content of the files at the path and the manifest cannot be \"instantiated\" by someone else without knowing the exact content of all the packages that are tracking a path.Note that if you add a dependency to a package that tracks a local path, the Manifest (which contains the whole dependency graph) will become out of sync with the actual dependency graph. This means that the package will not be able to load that dependency since it is not recorded in the Manifest. To update sync the Manifest, use the REPL command resolve."
},

{
    "location": "managing-packages/#Removing-packages-1",
    "page": "3. Managing Packages",
    "title": "Removing packages",
    "category": "section",
    "text": "Packages can be removed from the current project by using pkg> rm Package. This will only remove packages that exist in the project, to remove a package that only exists as a dependency use pkg> rm --manifest DepPackage. Note that this will remove all packages that depends on DepPackage."
},

{
    "location": "managing-packages/#Updating-packages-1",
    "page": "3. Managing Packages",
    "title": "Updating packages",
    "category": "section",
    "text": "When new versions of packages the project is using are released, it is a good idea to update. Simply calling up will try to update all the dependencies of the project to the latest compatible version. Sometimes this is not what you want. You can specify a subset of the dependencies to upgrade by giving them as arguments to up, e.g:(v1.0) pkg> up ExampleThe version of all other packages direct dependencies will stay the same. If you only want to update the minor version of packages, to reduce the risk that your project breaks, you can give the --minor flag, e.g:(v1.0) pkg> up --minor ExamplePackages that track a repository are not updated when a minor upgrade is done. Packages that track a path are never touched by the package manager."
},

{
    "location": "managing-packages/#Pinning-a-package-1",
    "page": "3. Managing Packages",
    "title": "Pinning a package",
    "category": "section",
    "text": "A pinned package will never be updated. A package can be pinned using pin as for example(v1.0) pkg> pin Example\n Resolving package versions...\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [7876af07] ~ Example v0.5.1 ⇒ v0.5.1 ⚲\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [7876af07] ~ Example v0.5.1 ⇒ v0.5.1 ⚲Note the pin symbol ⚲ showing that the package is pinned. Removing the pin is done using free(v1.0) pkg> free Example\n  Updating `~/.julia/environments/v1.0/Project.toml`\n  [7876af07] ~ Example v0.5.1 ⚲ ⇒ v0.5.1\n  Updating `~/.julia/environments/v1.0/Manifest.toml`\n  [7876af07] ~ Example v0.5.1 ⚲ ⇒ v0.5.1"
},

{
    "location": "managing-packages/#Testing-packages-1",
    "page": "3. Managing Packages",
    "title": "Testing packages",
    "category": "section",
    "text": "The tests for a package can be run using testcommand:(v1.0) pkg> test Example\n   Testing Example\n   Testing Example tests passed"
},

{
    "location": "managing-packages/#Building-packages-1",
    "page": "3. Managing Packages",
    "title": "Building packages",
    "category": "section",
    "text": "The build step of a package is automatically run when a package is first installed. The output of the build process is directed to a file. To explicitly run the build step for a package the build command is used:(v1.0) pkg> build MbedTLS\n  Building MbedTLS → `~/.julia/packages/MbedTLS/h1Vu/deps/build.log`\n\nshell> cat ~/.julia/packages/MbedTLS/h1Vu/deps/build.log\n┌ Warning: `wait(t::Task)` is deprecated, use `fetch(t)` instead.\n│   caller = macro expansion at OutputCollector.jl:63 [inlined]\n└ @ Core OutputCollector.jl:63\n...\n[ Info: using prebuilt binaries"
},

{
    "location": "managing-packages/#Garbage-collecting-old,-unused-packages-1",
    "page": "3. Managing Packages",
    "title": "Garbage collecting old, unused packages",
    "category": "section",
    "text": "As packages are updated and projects are deleted, installed packages that were once used will inevitably become old and not used from any existing project. Pkg keeps a log of all projects used so it can go through the log and see exactly which projects still exist and what packages those projects used. The rest can be deleted. This is done with the gc command:(v1.0) pkg> gc\n    Active manifests at:\n        `/Users/kristoffer/BinaryProvider/Manifest.toml`\n        ...\n        `/Users/kristoffer/Compat.jl/Manifest.toml`\n   Deleted /Users/kristoffer/.julia/packages/BenchmarkTools/1cAj: 146.302 KiB\n   Deleted /Users/kristoffer/.julia/packages/Cassette/BXVB: 795.557 KiB\n   ...\n   Deleted /Users/kristoffer/.julia/packages/WeakRefStrings/YrK6: 27.328 KiB\n   Deleted 36 package installations: 113.205 MiBNote that only packages in ~/.julia/packages are deleted."
},

{
    "location": "managing-packages/#Preview-mode-1",
    "page": "3. Managing Packages",
    "title": "Preview mode",
    "category": "section",
    "text": "If you just want to see the effects of running a command, but not change your state you can preview a command. For example:(HelloWorld) pkg> preview add Plotsor(HelloWorld) pkg> preview upwill show you the effects of adding Plots, or doing a full upgrade, respectively, would have on your project. However, nothing would be installed and your Project.toml and Manifest.toml are untouched."
},

{
    "location": "environments/#",
    "page": "4. Working with Environments",
    "title": "4. Working with Environments",
    "category": "page",
    "text": ""
},

{
    "location": "environments/#**4.**-Working-with-Environments-1",
    "page": "4. Working with Environments",
    "title": "4. Working with Environments",
    "category": "section",
    "text": ""
},

{
    "location": "environments/#Creating-your-own-projects-1",
    "page": "4. Working with Environments",
    "title": "Creating your own projects",
    "category": "section",
    "text": "So far we have added packages to the default project at ~/.julia/environments/v1.0, it is, however, easy to create other, independent, projects. It should be pointed out if two projects uses the same package at the same version, the content of this package is not duplicated. In order to create a new project, create a directory for it and then activate that directory to make it the \"active project\" which package operations manipulate:shell> mkdir MyProject\n\nshell> cd MyProject\n/Users/kristoffer/MyProject\n\n(v1.0) pkg> activate .\n\n(MyProject) pkg> st\n    Status `Project.toml`Note that the REPL prompt changed when the new project is activated. Since this is a newly created project, the status command show it contains no packages, and in fact, it has no project or manifest file until we add a package to it:shell> ls -l\ntotal 0\n\n(MyProject) pkg> add Example\n  Updating registry at `~/.julia/registries/General`\n  Updating git-repo `https://github.com/JuliaRegistries/General.git`\n Resolving package versions...\n  Updating `Project.toml`\n  [7876af07] + Example v0.5.1\n  Updating `Manifest.toml`\n  [7876af07] + Example v0.5.1\n  [8dfed614] + Test\n\nshell> ls -l\ntotal 8\n-rw-r--r-- 1 stefan staff 207 Jul  3 16:35 Manifest.toml\n-rw-r--r-- 1 stefan staff  56 Jul  3 16:35 Project.toml\n\nshell> cat Project.toml\n[deps]\nExample = \"7876af07-990d-54b4-ab0e-23690620f79a\"\n\nshell> cat Manifest.toml\n[[Example]]\ndeps = [\"Test\"]\ngit-tree-sha1 = \"8eb7b4d4ca487caade9ba3e85932e28ce6d6e1f8\"\nuuid = \"7876af07-990d-54b4-ab0e-23690620f79a\"\nversion = \"0.5.1\"\n\n[[Test]]\nuuid = \"8dfed614-e22c-5e08-85e1-65c5234f0b40\"This new environment is completely separate from the one we used earlier."
},

{
    "location": "environments/#Precompiling-a-project-1",
    "page": "4. Working with Environments",
    "title": "Precompiling a project",
    "category": "section",
    "text": "The REPL command precompile can be used to precompile all the dependencies in the project. You can for example do(HelloWorld) pkg> update; precompileto update the dependencies and then precompile them."
},

{
    "location": "environments/#Using-someone-else\'s-project-1",
    "page": "4. Working with Environments",
    "title": "Using someone else\'s project",
    "category": "section",
    "text": "Simply clone their project using e.g. git clone, cd to the project directory and call(v1.0) pkg> activate .\n\n(SomeProject) pkg> instantiateIf the project contains a manifest, this will install the packages in the same state that is given by that manifest. Otherwise, it will resolve the latest versions of the dependencies compatible with the project."
},

{
    "location": "creating-packages/#",
    "page": "5. Creating Packages",
    "title": "5. Creating Packages",
    "category": "page",
    "text": ""
},

{
    "location": "creating-packages/#**5.**-Creating-Packages-1",
    "page": "5. Creating Packages",
    "title": "5. Creating Packages",
    "category": "section",
    "text": "A package is a project with a name, uuid and version entry in the Project.toml file, and a src/PackageName.jl file that defines the module PackageName. This file is executed when the package is loaded."
},

{
    "location": "creating-packages/#Generating-files-for-a-package-1",
    "page": "5. Creating Packages",
    "title": "Generating files for a package",
    "category": "section",
    "text": "To generate files for a new package, use pkg> generate.(v1.0) pkg> generate HelloWorldThis creates a new project HelloWorld with the following files (visualized with the external tree command):shell> cd HelloWorld\n\nshell> tree .\n.\n├── Project.toml\n└── src\n    └── HelloWorld.jl\n\n1 directory, 2 filesThe Project.toml file contains the name of the package, its unique UUID, its version, the author and eventual dependencies:name = \"HelloWorld\"\nuuid = \"b4cd1eb8-1e24-11e8-3319-93036a3eb9f3\"\nversion = \"0.1.0\"\nauthor = [\"Some One <someone@email.com>\"]\n\n[deps]The content of src/HelloWorld.jl is:module HelloWorld\n\ngreet() = print(\"Hello World!\")\n\nend # moduleWe can now activate the project and load the package:pkg> activate .\n\njulia> import HelloWorld\n\njulia> HelloWorld.greet()\nHello World!"
},

{
    "location": "creating-packages/#Adding-dependencies-to-the-project-1",
    "page": "5. Creating Packages",
    "title": "Adding dependencies to the project",
    "category": "section",
    "text": "Let’s say we want to use the standard library package Random and the registered package JSON in our project. We simply add these packages (note how the prompt now shows the name of the newly generated project, since we are inside the HelloWorld project directory):(HelloWorld) pkg> add Random JSON\n Resolving package versions...\n  Updating \"~/Documents/HelloWorld/Project.toml\"\n [682c06a0] + JSON v0.17.1\n [9a3f8284] + Random\n  Updating \"~/Documents/HelloWorld/Manifest.toml\"\n [34da2185] + Compat v0.57.0\n [682c06a0] + JSON v0.17.1\n [4d1e1d77] + Nullables v0.0.4\n ...Both Random and JSON got added to the project’s Project.toml file, and the resulting dependencies got added to the Manifest.toml file. The resolver has installed each package with the highest possible version, while still respecting the compatibility that each package enforce on its dependencies.We can now use both Random and JSON in our project. Changing src/HelloWorld.jl tomodule HelloWorld\n\nimport Random\nimport JSON\n\ngreet() = print(\"Hello World!\")\ngreet_alien() = print(\"Hello \", Random.randstring(8))\n\nend # moduleand reloading the package, the new greet_alien function that uses Random can be used:julia> HelloWorld.greet_alien()\nHello aT157rHV"
},

{
    "location": "creating-packages/#Adding-a-build-step-to-the-package.-1",
    "page": "5. Creating Packages",
    "title": "Adding a build step to the package.",
    "category": "section",
    "text": "The build step is executed the first time a package is installed or when explicitly invoked with build. A package is built by executing the file deps/build.jl.shell> cat deps/build.jl\nprintln(\"I am being built...\")\n\n(HelloWorld) pkg> build\n  Building HelloWorld → `deps/build.log`\n Resolving package versions...\n\nshell> cat deps/build.log\nI am being built...If the build step fails, the output of the build step is printed to the consoleshell> cat deps/build.jl\nerror(\"Ooops\")\n\n(HelloWorld) pkg> build\n  Building HelloWorld → `deps/build.log`\n Resolving package versions...\n┌ Error: Error building `HelloWorld`:\n│ ERROR: LoadError: Ooops\n│ Stacktrace:\n│  [1] error(::String) at ./error.jl:33\n│  [2] top-level scope at none:0\n│  [3] include at ./boot.jl:317 [inlined]\n│  [4] include_relative(::Module, ::String) at ./loading.jl:1071\n│  [5] include(::Module, ::String) at ./sysimg.jl:29\n│  [6] include(::String) at ./client.jl:393\n│  [7] top-level scope at none:0\n│ in expression starting at /Users/kristoffer/.julia/dev/Pkg/HelloWorld/deps/build.jl:1\n└ @ Pkg.Operations Operations.jl:938"
},

{
    "location": "creating-packages/#Adding-tests-to-the-package-1",
    "page": "5. Creating Packages",
    "title": "Adding tests to the package",
    "category": "section",
    "text": "When a package is tested the file test/runtests.jl is executed.shell> cat test/runtests.jl\nprintln(\"Testing...\")\n(HelloWorld) pkg> test\n   Testing HelloWorld\n Resolving package versions...\nTesting...\n   Testing HelloWorld tests passed"
},

{
    "location": "creating-packages/#Test-specific-dependencies-1",
    "page": "5. Creating Packages",
    "title": "Test-specific dependencies",
    "category": "section",
    "text": "Sometimes one might want to use some packages only at testing time but not enforce a dependency on them when the package is used. This is possible by adding dependencies to [extras] and a test target in [targets] to the Project file. Here we add the Test standard library as a test-only dependency by adding the following to the Project file:[extras]\nTest = \"8dfed614-e22c-5e08-85e1-65c5234f0b40\"\n\n[targets]\ntest = [\"Test\"]We can now use Test in the test script and we can see that it gets installed on testing:shell> cat test/runtests.jl\nusing Test\n@test 1 == 1\n\n(HelloWorld) pkg> test\n   Testing HelloWorld\n Resolving package versions...\n  Updating `/var/folders/64/76tk_g152sg6c6t0b4nkn1vw0000gn/T/tmpPzUPPw/Project.toml`\n  [d8327f2a] + HelloWorld v0.1.0 [`~/.julia/dev/Pkg/HelloWorld`]\n  [8dfed614] + Test\n  Updating `/var/folders/64/76tk_g152sg6c6t0b4nkn1vw0000gn/T/tmpPzUPPw/Manifest.toml`\n  [d8327f2a] + HelloWorld v0.1.0 [`~/.julia/dev/Pkg/HelloWorld`]\n   Testing HelloWorld tests passed```"
},

{
    "location": "creating-packages/#Package-naming-guidelines-1",
    "page": "5. Creating Packages",
    "title": "Package naming guidelines",
    "category": "section",
    "text": "Package names should be sensible to most Julia users, even to those who are not domain experts. The following guidelines applies to the General registry, but may be useful for other package registries as well.Since the General registry belongs to the entire community people may have opinions about your package name when you publish it, especially if it\'s ambiguous or can be confused with something other than what it is. Usually you will then get suggestions for a new name that may fit your package better.Avoid jargon. In particular, avoid acronyms unless there is minimal possibility of confusion.\nIt\'s ok to say USA if you\'re talking about the USA.\nIt\'s not ok to say PMA, even if you\'re talking about positive mental attitude.\nAvoid using Julia in your package name.\nIt is usually clear from context and to your users that the package is a Julia package.\nHaving Julia in the name can imply that the package is connected to, or endorsed by, contributors to the Julia language itself.\nPackages that provide most of their functionality in association with a new type should have pluralized names.\nDataFrames provides the DataFrame type.\nBloomFilters provides the BloomFilter type.\nIn contrast, JuliaParser provides no new type, but instead new functionality in the JuliaParser.parse() function.\nErr on the side of clarity, even if clarity seems long-winded to you.\nRandomMatrices is a less ambiguous name than RndMat or RMT, even though the latter are shorter.\nA less systematic name may suit a package that implements one of several possible approaches to its domain.\nJulia does not have a single comprehensive plotting package. Instead, Gadfly, PyPlot, Winston and other packages each implement a unique approach based on a particular design philosophy.\nIn contrast, SortingAlgorithms provides a consistent interface to use many well-established sorting algorithms.\nPackages that wrap external libraries or programs should be named after those libraries or programs.\nCPLEX.jl wraps the CPLEX library, which can be identified easily in a web search.\nMATLAB.jl provides an interface to call the MATLAB engine from within Julia."
},

{
    "location": "compatibility/#",
    "page": "6. Compatibility",
    "title": "6. Compatibility",
    "category": "page",
    "text": ""
},

{
    "location": "compatibility/#**6.**-Compatibility-1",
    "page": "6. Compatibility",
    "title": "6. Compatibility",
    "category": "section",
    "text": "Compatibility refers to the ability to restrict what version of the dependencies that your project is compatible with. If the compatibility for a dependency is not given, the project is assumed to be compatible with all versions of that dependency.Compatibility for a dependency is entered in the Project.toml file as for example:[compat]\njulia = \"1.0\"\nExample = \"0.4.3\"After a compatibility entry is put into the project file, up can be used to apply it.The format of the version specifier is described in detail below.info: Info\nThere is currently no way to give compatibility from the Pkg REPL mode so for now, one has to manually edit the project file."
},

{
    "location": "compatibility/#Version-specifier-format-1",
    "page": "6. Compatibility",
    "title": "Version specifier format",
    "category": "section",
    "text": "Similar to other package managers, the Julia package manager respects semantic versioning (semver). As an example, a version specifier is given as e.g. 1.2.3 is therefore assumed to be compatible with the versions [1.2.3 - 2.0.0) where ) is a non-inclusive upper bound. More specifically, a version specifier is either given as a caret specifier, e.g. ^1.2.3  or a tilde specifier ~1.2.3. Caret specifiers are the default and hence 1.2.3 == ^1.2.3. The difference between a caret and tilde is described in the next section. The union of multiple version specifiers can be formed by comma separating individual version specifiers, e.g.[compat]\nExample = \"1.2, 2\"will result in [1.2.0, 3.0.0)."
},

{
    "location": "compatibility/#Caret-specifiers-1",
    "page": "6. Compatibility",
    "title": "Caret specifiers",
    "category": "section",
    "text": "A caret specifier allows upgrade that would be compatible according to semver. An updated dependency is considered compatible if the new version does not modify the left-most non zero digit in the version specifier.Some examples are shown below.[compat]\nPkgA = \"^1.2.3\" # [1.2.3, 2.0.0)\nPkgB = \"^1.2\"   # [1.2.0, 2.0.0)\nPkgC = \"^1\"     # [1.0.0, 2.0.0)\nPkgD = \"^0.2.3\" # [0.2.3, 0.3.0)\nPkgE = \"^0.0.3\" # [0.0.3, 0.0.4)\nPkgF = \"^0.0\"   # [0.0.0, 0.1.0)\nPkgG = \"^0\"     # [0.0.0, 1.0.0)While the semver specification says that all versions with a major version of 0 are incompatible with each other, we have made that choice that a version given as 0.a.b is considered compatible with 0.a.c if a != 0 and  c >= b."
},

{
    "location": "compatibility/#Tilde-specifiers-1",
    "page": "6. Compatibility",
    "title": "Tilde specifiers",
    "category": "section",
    "text": "A tilde specifier provides more limited upgrade possibilities. When specifying major, minor and patch version, or when specifying major and minor version, only patch version is allowed to change. If you only specify a major version, then both minor and patch versions are allowed to be upgraded (~1 is thus equivalent to ^1). This gives the following example.[compat]\nPkgA = \"~1.2.3\" # [1.2.3, 1.3.0)\nPkgB = \"~1.2\"   # [1.2.0, 1.3.0)\nPkgC = \"~1\"     # [1.0.0, 2.0.0)"
},

{
    "location": "compatibility/#Inequality-specifiers-1",
    "page": "6. Compatibility",
    "title": "Inequality specifiers",
    "category": "section",
    "text": "Inequalities can also be used to specify version ranges:[compat]\nPkgA = \">= 1.2.3\" # [1.2.3,  ∞)\nPkgB = \"≥ 1.2.3\"  # [1.2.3,  ∞)\nPkgC = \"= 1.2.3\"  # [1.2.3, 1.2.3]\nPkgD = \"< 1.2.3\"  # [0.0.0, 1.2.2]"
},

{
    "location": "registries/#",
    "page": "7. Registries",
    "title": "7. Registries",
    "category": "page",
    "text": ""
},

{
    "location": "registries/#**7.**-Registries-1",
    "page": "7. Registries",
    "title": "7. Registries",
    "category": "section",
    "text": "Registries contain information about packages, such as available releases, dependencies and where it can be downloaded. The General registry (https://github.com/JuliaRegistries/General) is the default one, and is installed automatically."
},

{
    "location": "registries/#Managing-registries-1",
    "page": "7. Registries",
    "title": "Managing registries",
    "category": "section",
    "text": "compat: Julia 1.1\nPkg\'s registry handling requires at least Julia 1.1.Registries can be added, removed and updated from either the Pkg REPL or by using the function based API. In this section we will describe the REPL interface. The registry API is documented in the Registry API Reference section."
},

{
    "location": "registries/#Adding-registries-1",
    "page": "7. Registries",
    "title": "Adding registries",
    "category": "section",
    "text": "A custom registry can be added with the registry add command from the Pkg REPL. Usually this will be done with a URL to the registry. Here we add the General registrypkg> registry add https://github.com/JuliaRegistries/General\n   Cloning registry from \"https://github.com/JuliaRegistries/General\"\n     Added registry `General` to `~/.julia/registries/General`and now all the packages registered in General are available for e.g. adding. To see which registries are currently installed you can use the registry status (or registry st) commandpkg> registry st\nRegistry Status\n [23338594] General (https://github.com/JuliaRegistries/General.git)Registries are always added to the user depot, which is the first entry in DEPOT_PATH."
},

{
    "location": "registries/#Removing-registries-1",
    "page": "7. Registries",
    "title": "Removing registries",
    "category": "section",
    "text": "Registries can be removed with the registry remove (or registry rm) command. Here we remove the General registrypkg> registry rm General\n  Removing registry `General` from ~/.julia/registries/General\n\npkg> registry st\nRegistry Status\n  (no registries found)In case there are multiple registries named General installed you have to disambiguate with the uuid, just as when manipulating packages, e.g.pkg> registry rm General=23338594-aafe-5451-b93e-139f81909106\n  Removing registry `General` from ~/.julia/registries/General"
},

{
    "location": "registries/#Updating-registries-1",
    "page": "7. Registries",
    "title": "Updating registries",
    "category": "section",
    "text": "The registry update (or registry up) command is available to update registries. Here we update the General registry,pkg> registry up General\n  Updating registry at `~/.julia/registries/General`\n  Updating git-repo `https://github.com/JuliaRegistries/General`and to update all installed user registries just dopkg> registry up\n  Updating registry at `~/.julia/registries/General`\n  Updating git-repo `https://github.com/JuliaRegistries/General`"
},

{
    "location": "glossary/#",
    "page": "8. Glossary",
    "title": "8. Glossary",
    "category": "page",
    "text": ""
},

{
    "location": "glossary/#**8.**-Glossary-1",
    "page": "8. Glossary",
    "title": "8. Glossary",
    "category": "section",
    "text": "Project: a source tree with a standard layout, including a src directory for the main body of Julia code, a test directory for testing the project, docs for documentation files, and optionally a deps directory for a build script and its outputs. A project will typically also have a project file and may optionally have a manifest file:Project file: a file in the root directory of a project, named Project.toml (or JuliaProject.toml) describing metadata about the project, including its name, UUID (for packages), authors, license, and the names and UUIDs of packages and libraries that it depends on.\nManifest file: a file in the root directory of a project, named Manifest.toml (or JuliaManifest.toml) describing a complete dependency graph and exact versions of each package and library used by a project.Package: a project which provides reusable functionality that can be used by other Julia projects via import X or using X. A package should have a project file with a uuid entry giving its package UUID. This UUID is used to identify the package in projects that depend on it.note: Note\nFor legacy reasons it is possible to load a package without a project file or UUID from the REPL or the top-level of a script. It is not possible, however, to load a package without a project file or UUID from a project with them. Once you\'ve loaded from a project file, everything needs a project file and UUID.Application: a project which provides standalone functionality not intended to be reused by other Julia projects. For example a web application or a commmand-line utility, or simulation/analytics code accompanying a scientific paper. An application may have a UUID but does not need one. An application may also provide global configuration options for packages it depends on. Packages, on the other hand, may not provide global configuration since that could conflict with the configuration of the main application.note: Note\nProjects vs. Packages vs. Applications:Project is an umbrella term: packages and applications are kinds of projects.\nPackages should have UUIDs, applications can have a UUIDs but don\'t need them.\nApplications can provide global configuration, whereas packages cannot.Library (future work): a compiled binary dependency (not written in Julia) packaged to be used by a Julia project. These are currently typically built in- place by a deps/build.jl script in a project’s source tree, but in the future we plan to make libraries first-class entities directly installed and upgraded by the package manager.Environment: the combination of the top-level name map provided by a project file combined with the dependency graph and map from packages to their entry points provided by a manifest file. For more detail see the manual section on code loading.Explicit environment: an environment in the form of an explicit project file and an optional corresponding manifest file together in a directory. If the manifest file is absent then the implied dependency graph and location maps are empty.\nImplicit environment: an environment provided as a directory (without a project file or manifest file) containing packages with entry points of the form X.jl, X.jl/src/X.jl or X/src/X.jl. The top-level name map is implied by these entry points. The dependency graph is implied by the existence of project files inside of these package directories, e.g. X.jl/Project.toml or X/Project.toml. The dependencies of the X package are the dependencies in the corresponding project file if there is one. The location map is implied by the entry points themselves.Registry: a source tree with a standard layout recording metadata about a registered set of packages, the tagged versions of them which are available, and which versions of packages are compatible or incompatible with each other. A registry is indexed by package name and UUID, and has a directory for each registered package providing the following metadata about it:name – e.g. DataFrames\nUUID – e.g. a93c6f00-e57d-5684-b7b6-d8193f3e46c0\nauthors – e.g. Jane Q. Developer <jane@example.com>\nlicense – e.g. MIT, BSD3, or GPLv2\nrepository – e.g. https://github.com/JuliaData/DataFrames.jl.git\ndescription – a block of text summarizing the functionality of a package\nkeywords – e.g. data, tabular, analysis, statistics\nversions – a list of all registered version tagsFor each registered version of a package, the following information is provided:its semantic version number – e.g. v1.2.3\nits git tree SHA-1 hash – e.g. 7ffb18ea3245ef98e368b02b81e8a86543a11103\na map from names to UUIDs of dependencies\nwhich versions of other packages it is compatible/incompatible withDependencies and compatibility are stored in a compressed but human-readable format using ranges of package versions.Depot: a directory on a system where various package-related resources live, including:environments: shared named environments (e.g. v1.0, devtools)\nclones: bare clones of package repositories\ncompiled: cached compiled package images (.ji files)\nconfig: global configuration files (e.g. startup.jl)\ndev: default directory for package development\nlogs: log files (e.g. manifest_usage.toml, repl_history.jl)\npackages: installed package versions\nregistries: clones of registries (e.g. General)Load path: a stack of environments where package identities, their dependencies, and entry-points are searched for. The load path is controlled in Julia by the LOAD_PATH global variable which is populated at startup based on the value of the JULIA_LOAD_PATH environment variable. The first entry is your primary environment, often the current project, while later entries provide additional packages one may want to use from the REPL or top-level scripts.Depot path: a stack of depot locations where the package manager, as well as Julia\'s code loading mechanisms, look for registries, installed packages, named environments, repo clones, cached compiled package images, and configuration files. The depot path is controlled by the Julia DEPOT_PATH global variable which is populated at startup based on the value of the JULIA_DEPOT_PATH environment variable. The first entry is the “user depot” and should be writable by and owned by the current user. The user depot is where: registries are cloned, new package versions are installed, named environments are created and updated, package repos are cloned, newly compiled package image files are saved, log files are written, development packages are checked out by default, and global configuration data is saved. Later entries in the depot path are treated as read-only and are appropriate for registries, packages, etc. installed and managed by system administrators."
},

{
    "location": "repl/#",
    "page": "9. REPL Mode Reference",
    "title": "9. REPL Mode Reference",
    "category": "page",
    "text": ""
},

{
    "location": "repl/#REPL-Mode-Reference-1",
    "page": "9. REPL Mode Reference",
    "title": "9. REPL Mode Reference",
    "category": "section",
    "text": "This section describes available commands in the Pkg REPL. The REPL mode is mostly meant for interactive use, and for non-interactive use it is recommended to use the \"API mode\", see API Reference."
},

{
    "location": "repl/#package-commands-1",
    "page": "9. REPL Mode Reference",
    "title": "package commands",
    "category": "section",
    "text": "<section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-add\" href=\"#repl-add\">\n        <code>add</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"add\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-build\" href=\"#repl-build\">\n        <code>build</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"build\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-develop\" href=\"#repl-develop\">\n        <code>develop</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"develop\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-free\" href=\"#repl-free\">\n        <code>free</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"free\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-generate\" href=\"#repl-generate\">\n        <code>generate</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"generate\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-pin\" href=\"#repl-pin\">\n        <code>pin</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"pin\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-remove\" href=\"#repl-remove\">\n        <code>remove</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"remove\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-test\" href=\"#repl-test\">\n        <code>test</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"test\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-update\" href=\"#repl-update\">\n        <code>update</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"update\").help</section>"
},

{
    "location": "repl/#registry-commands-1",
    "page": "9. REPL Mode Reference",
    "title": "registry commands",
    "category": "section",
    "text": "<section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-registry-add\" href=\"#repl-registry-add\">\n        <code>registry add</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"registry-add\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-registry-remove\" href=\"#repl-registry-remove\">\n        <code>registry remove</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"registry-remove\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-registry-status\" href=\"#repl-registry-status\">\n        <code>registry status</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"registry-status\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-registry-update\" href=\"#repl-registry-update\">\n        <code>registry update</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"registry-update\").help</section>"
},

{
    "location": "repl/#Other-commands-1",
    "page": "9. REPL Mode Reference",
    "title": "Other commands",
    "category": "section",
    "text": "<section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-activate\" href=\"#repl-activate\">\n        <code>activate</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"activate\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-gc\" href=\"#repl-gc\">\n        <code>gc</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"gc\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-help\" href=\"#repl-help\">\n        <code>help</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"help\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-instantiate\" href=\"#repl-instantiate\">\n        <code>instantiate</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"instantiate\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-precompile\" href=\"#repl-precompile\">\n        <code>precompile</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"precompile\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-resolve\" href=\"#repl-resolve\">\n        <code>resolve</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"resolve\").help</section><section class=\"docstring\">\n<div class=\"docstring-header\">\n    <a class=\"docstring-binding\" id=\"repl-status\" href=\"#repl-status\">\n        <code>status</code>\n    </a>\n    —\n    <span class=\"docstring-category\">REPL command</span>\n.\n</div>using Pkg\nPkg.REPLMode.CommandSpec(\"status\").help</section>"
},

{
    "location": "api/#",
    "page": "10. API Reference",
    "title": "10. API Reference",
    "category": "page",
    "text": ""
},

{
    "location": "api/#API-Reference-1",
    "page": "10. API Reference",
    "title": "10. API Reference",
    "category": "section",
    "text": "This section describes the function interface, or \"API mode\" for interacting with Pkg.jl. The function API is recommended for non-interactive usage, in i.e. scripts."
},

{
    "location": "api/#Pkg.PackageSpec",
    "page": "10. API Reference",
    "title": "Pkg.PackageSpec",
    "category": "function",
    "text": "PackageSpec(name::String, [uuid::UUID, version::VersionNumber])\nPackageSpec(; name, url, path, rev, version, mode, level)\n\nA PackageSpec is a representation of a package with various metadata. This includes:\n\nThe name of the package.\nThe package unique uuid.\nA version (for example when adding a package. When upgrading, can also be an instance of\n\nthe enum UpgradeLevel\n\nA url and an optional git revision. rev could be a branch name or a git commit SHA.\nA local path path. This is equivalent to using the url argument but can be more descriptive.\nA mode, which is an instance of the enum PackageMode which can be either PKGMODE_PROJECT or\n\nPKGMODE_MANIFEST, defaults to PKGMODE_PROJECT. Used in e.g. Pkg.rm.\n\nMost functions in Pkg take a Vector of PackageSpec and do the operation on all the packages in the vector.\n\nBelow is a comparison between the REPL version and the PackageSpec version:\n\nREPL API\nPackage PackageSpec(\"Package\")\nPackage@0.2 PackageSpec(name=\"Package\", version=\"0.2\")\nPackage=a67d... PackageSpec(name=\"Package\", uuid=\"a67d...\")\nPackage#master PackageSpec(name=\"Package\", rev=\"master\")\nlocal/path#feature PackageSpec(path=\"local/path\"; rev=\"feature\")\nwww.mypkg.com PackageSpec(url=\"www.mypkg.com\")\n--manifest Package PackageSpec(name=\"Package\", mode=PKGSPEC_MANIFEST)\n--major Package PackageSpec(name=\"Package\", version=PKGLEVEL_MAJOR)\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.PackageMode",
    "page": "10. API Reference",
    "title": "Pkg.PackageMode",
    "category": "type",
    "text": "PackageMode\n\nAn enum with the instances\n\nPKGMODE_MANIFEST\nPKGMODE_PROJECT\n\nDetermines if operations should be made on a project or manifest level. Used as an argument to  PackageSpec or as an argument to Pkg.rm.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.UpgradeLevel",
    "page": "10. API Reference",
    "title": "Pkg.UpgradeLevel",
    "category": "type",
    "text": "UpgradeLevel\n\nAn enum with the instances\n\nUPLEVEL_FIXED\nUPLEVEL_PATCH\nUPLEVEL_MINOR\nUPLEVEL_MAJOR\n\nDetermines how much a package is allowed to be updated. Used as an argument to  PackageSpec or as an argument to Pkg.update.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.add",
    "page": "10. API Reference",
    "title": "Pkg.add",
    "category": "function",
    "text": "Pkg.add(pkg::Union{String, Vector{String}})\nPkg.add(pkg::Union{PackageSpec, Vector{PackageSpec}})\n\nAdd a package to the current project. This package will be available using the import and using keywords in the Julia REPL and if the current project is a package, also inside that package.\n\nExamples\n\nPkg.add(\"Example\") # Add a package from registry\nPkg.add(PackageSpec(name=\"Example\", version=\"0.3\")) # Specify version\nPkg.add(PackageSpec(url=\"https://github.com/JuliaLang/Example.jl\", rev=\"master\")) # From url to remote gitrepo\nPkg.add(PackageSpec(url=\"/remote/mycompany/juliapackages/OurPackage\"))` # From path to local gitrepo\n\nSee also PackageSpec.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.develop",
    "page": "10. API Reference",
    "title": "Pkg.develop",
    "category": "function",
    "text": "Pkg.develop(pkg::Union{String, Vector{String}})\nPkg.develop(pkgs::Union{Packagespec, Vector{Packagespec}})\n\nMake a package available for development by tracking it by path. If pkg is given with only a name or by a URL the packages will be downloaded to the location by the environment variable JULIA_PKG_DEVDIR with .julia/dev as the default.\n\nIf pkg is given as a local path, the package at that path will be tracked.\n\nExamples\n\n# By name\nPkg.develop(\"Example\")\n\n# By url\nPkg.develop(PackageSpec(url=\"https://github.com/JuliaLang/Compat.jl\"))\n\n# By path\nPkg.develop(PackageSpec(path=\"MyJuliaPackages/Package.jl\"))\n\nSee also PackageSpec\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.activate",
    "page": "10. API Reference",
    "title": "Pkg.activate",
    "category": "function",
    "text": "Pkg.activate([s::String]; shared::Bool=false)\n\nActivate the environment at s. The active environment is the environment that is modified by executing package commands. The logic for what path is activated is as follows:\n\nIf shared is true, the first existing environment named s from the depots in the depot stack will be activated. If no such environment exists, create and activate that environment in the first depot.\nIf s is an existing path, then activate the environment at that path.\nIf s is a package in the current project and s is tracking a path, then activate the environment at the tracked path.\nElse, s is interpreted as a non-existing path, activate that path.\n\nIf no argument is given to activate, then activate the home project. The home project is specified by either the --project command line option to the julia executable, or the JULIA_PROJECT environment variable.\n\nExamples\n\nPkg.activate()\nPkg.activate(\"local/path\")\nPkg.activate(\"MyDependency\")\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.rm",
    "page": "10. API Reference",
    "title": "Pkg.rm",
    "category": "function",
    "text": "Pkg.rm(pkg::Union{String, Vector{String}})\nPkg.rm(pkg::Union{PackageSpec, Vector{PackageSpec}})\n\nRemove a package from the current project. If the mode of pkg is PKGMODE_MANIFEST also remove it from the manifest including all recursive dependencies of pkg.\n\nSee also PackageSpec, PackageMode.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.update",
    "page": "10. API Reference",
    "title": "Pkg.update",
    "category": "function",
    "text": "Pkg.update(; level::UpgradeLevel=UPLEVEL_MAJOR, mode::PackageMode = PKGMODE_PROJECT)\nPkg.update(pkg::Union{String, Vector{String}})\nPkg.update(pkg::Union{PackageSpec, Vector{PackageSpec}})\n\nUpdate a package pkg. If no posistional argument is given, update all packages in the manifest if mode is PKGMODE_MANIFEST and packages in both manifest and project if mode is PKGMODE_PROJECT. If no positional argument is given level can be used to control what how much packages are allowed to be upgraded (major, minor, patch, fixed).\n\nSee also PackageSpec, PackageMode, UpgradeLevel.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.test",
    "page": "10. API Reference",
    "title": "Pkg.test",
    "category": "function",
    "text": "Pkg.test(; coverage::Bool=false)\nPkg.test(pkg::Union{String, Vector{String}; coverage::Bool=false)\nPkg.test(pkgs::Union{PackageSpec, Vector{PackageSpec}}; coverage::Bool=false)\n\nRun the tests for package pkg or if no positional argument is given to test, the current project is tested (which thus needs to be a package). A package is tested by running its test/runtests.jl file.\n\nThe tests are run by generating a temporary environment with only pkg and its (recursive) dependencies (recursively) in it. If a manifest exist, the versions in that manifest is used, otherwise a feasible set of package are resolved and installed.\n\nDuring the test, test-specific dependencies are active, which are given in the project file as e.g.\n\n[extras]\nTest = \"8dfed614-e22c-5e08-85e1-65c5234f0b40\"\n\n[targets]\ntest = [\"Test\"]\n\nCoverage statistics for the packages may be generated by passing coverage=true. The default behavior is not to run coverage.\n\nThe tests are executed in a new process with check-bounds=yes and by default startup-file=no. If using the startup file (~/.julia/config/startup.jl) is desired, start julia with --startup-file=yes. Inlining of functions during testing can be disabled (for better coverage accuracy) by starting julia with --inline=no.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.build",
    "page": "10. API Reference",
    "title": "Pkg.build",
    "category": "function",
    "text": "Pkg.build(; verbose = false)\nPkg.build(pkg::Union{String, Vector{String}}; verbose = false)\nPkg.build(pkgs::Union{PackageSpec, Vector{PackageSpec}}; verbose = false)\n\nRun the build script in deps/build.jl for pkg and all of the dependencies in depth-first recursive order. If no argument is given to build, the current project is built, which thus needs to be a package. This function is called automatically one any package that gets installed for the first time. verbose = true prints the build output to stdout/stderr instead of redirecting to the build.log file.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.pin",
    "page": "10. API Reference",
    "title": "Pkg.pin",
    "category": "function",
    "text": "Pkg.pin(pkg::Union{String, Vector{String}})\nPkg.pin(pkgs::Union{Packagespec, Vector{Packagespec}})\n\nPin a package to the current version (or the one given in the packagespec or a certain git revision. A pinned package is never updated.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.free",
    "page": "10. API Reference",
    "title": "Pkg.free",
    "category": "function",
    "text": "Pkg.free(pkg::Union{String, Vector{String}})\nPkg.free(pkgs::Union{Packagespec, Vector{Packagespec}})\n\nFree a package which removes a pin if it exists, or if the package is tracking a path, e.g. after Pkg.develop, go back to tracking registered versions.\n\nExamples\n\nPkg.free(\"Package\")\nPkg.free(PackageSpec(\"Package\"))\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.instantiate",
    "page": "10. API Reference",
    "title": "Pkg.instantiate",
    "category": "function",
    "text": "Pkg.instantiate()\n\nIf a Manifest.toml file exist in the current project, download all the packages declared in that manifest. Else, resolve a set of feasible packages from the Project.toml files and install them.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.resolve",
    "page": "10. API Reference",
    "title": "Pkg.resolve",
    "category": "function",
    "text": "Pkg.resolve()\n\nUpdate the current manifest with eventual changes to the dependency graph from packages that are tracking a path.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.gc",
    "page": "10. API Reference",
    "title": "Pkg.gc",
    "category": "function",
    "text": "Pkg.gc()\n\nGarbage collect packages that are no longer reachable from any project. Only packages that are tracked by version are deleted, so no packages that might contain local changes are touched.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.status",
    "page": "10. API Reference",
    "title": "Pkg.status",
    "category": "function",
    "text": "Pkg.status([pkgs...]; mode::PackageMode=PKGMODE_PROJECT)\n\nPrint out the status of the project/manifest. If mode is PKGMODE_PROJECT prints out status about only those packages that are in the project (explicitly added). If mode is PKGMODE_MANIFEST also print for those in the manifest (recursive dependencies). If there are any packages listed as arguments the output will be limited to those packages.\n\ncompat: Julia 1.1\nPkg.status with package arguments requires at least Julia 1.1.\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.setprotocol!",
    "page": "10. API Reference",
    "title": "Pkg.setprotocol!",
    "category": "function",
    "text": "Pkg.setprotocol!(proto::Union{Nothing, AbstractString}=nothing)\n\nSet the protocol used to access GitHub-hosted packages when adding a url or developing a package. Defaults to delegating the choice to the package developer (proto == nothing). Other choices for proto are \"https\" or \"git\".\n\n\n\n\n\n"
},

{
    "location": "api/#Package-API-Reference-1",
    "page": "10. API Reference",
    "title": "Package API Reference",
    "category": "section",
    "text": "In the REPL mode packages (with associated version, UUID, URL etc) are parsed from strings, for example, \"Package#master\",\"Package@v0.1\", \"www.mypkg.com/MyPkg#my/feature\". It is possible to use strings as arguments for simple commands in the API mode (like Pkg.add([\"PackageA\", \"PackageB\"]), more complicated commands, that e.g. specify URLs or version range, uses a more structured format over strings. This is done by creating an instance of a PackageSpec which are passed in to functions.PackageSpec\nPackageMode\nUpgradeLevel\nPkg.add\nPkg.develop\nPkg.activate\nPkg.rm\nPkg.update\nPkg.test\nPkg.build\nPkg.pin\nPkg.free\nPkg.instantiate\nPkg.resolve\nPkg.gc\nPkg.status\nPkg.setprotocol!"
},

{
    "location": "api/#Pkg.RegistrySpec",
    "page": "10. API Reference",
    "title": "Pkg.RegistrySpec",
    "category": "type",
    "text": "RegistrySpec(name::String)\nRegistrySpec(; name, url, path)\n\nA RegistrySpec is a representation of a registry with various metadata, much like PackageSpec.\n\nMost registry functions in Pkg take a Vector of RegistrySpec and do the operation on all the registries in the vector.\n\ncompat: Julia 1.1\nPkg\'s registry handling requires at least Julia 1.1.\n\nExamples\n\nBelow is a comparison between the REPL version and the RegistrySpec version:\n\nREPL API\nRegistry RegistrySpec(\"Registry\")\nRegistry=a67d... RegistrySpec(name=\"Registry\", uuid=\"a67d...\")\nlocal/path RegistrySpec(path=\"local/path\")\nwww.myregistry.com RegistrySpec(url=\"www.myregistry.com\")\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.Registry.add",
    "page": "10. API Reference",
    "title": "Pkg.Registry.add",
    "category": "function",
    "text": "Pkg.Registry.add(url::String)\nPkg.Registry.add(registry::RegistrySpec)\n\nAdd new package registries.\n\ncompat: Julia 1.1\nPkg\'s registry handling requires at least Julia 1.1.\n\nExamples\n\nPkg.Registry.add(\"General\")\nPkg.Registry.add(RegistrySpec(uuid = \"23338594-aafe-5451-b93e-139f81909106\"))\nPkg.Registry.add(RegistrySpec(url = \"https://github.com/JuliaRegistries/General.git\"))\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.Registry.rm",
    "page": "10. API Reference",
    "title": "Pkg.Registry.rm",
    "category": "function",
    "text": "Pkg.Registry.rm(registry::String)\nPkg.Registry.rm(registry::RegistrySpec)\n\nRemove registries.\n\ncompat: Julia 1.1\nPkg\'s registry handling requires at least Julia 1.1.\n\nExamples\n\nPkg.Registry.rm(\"General\")\nPkg.Registry.rm(RegistrySpec(uuid = \"23338594-aafe-5451-b93e-139f81909106\"))\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.Registry.update",
    "page": "10. API Reference",
    "title": "Pkg.Registry.update",
    "category": "function",
    "text": "Pkg.Registry.update()\nPkg.Registry.update(registry::RegistrySpec)\nPkg.Registry.update(registry::Vector{RegistrySpec})\n\nUpdate registries. If no registries are given, update all available registries.\n\ncompat: Julia 1.1\nPkg\'s registry handling requires at least Julia 1.1.\n\nExamples\n\nPkg.Registry.update()\nPkg.Registry.update(\"General\")\nPkg.Registry.update(RegistrySpec(uuid = \"23338594-aafe-5451-b93e-139f81909106\"))\n\n\n\n\n\n"
},

{
    "location": "api/#Pkg.Registry.status",
    "page": "10. API Reference",
    "title": "Pkg.Registry.status",
    "category": "function",
    "text": "Pkg.Registry.status()\n\nDisplay information about available registries.\n\ncompat: Julia 1.1\nPkg\'s registry handling requires at least Julia 1.1.\n\nExamples\n\nPkg.Registry.status()\n\n\n\n\n\n"
},

{
    "location": "api/#Registry-API-Reference-1",
    "page": "10. API Reference",
    "title": "Registry API Reference",
    "category": "section",
    "text": "compat: Julia 1.1\nPkg\'s registry handling requires at least Julia 1.1.The function API for registries uses RegistrySpecs, similar to PackageSpec.RegistrySpec\nPkg.Registry.add\nPkg.Registry.rm\nPkg.Registry.update\nPkg.Registry.status"
},

]}
